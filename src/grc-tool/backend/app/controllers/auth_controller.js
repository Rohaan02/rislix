import crypto from 'node:crypto';
import * as OTPAuth from 'otpauth';
import { DateTime } from 'luxon';
import User from '#models/user';
import Role from '#models/role';
import PasswordResetToken from '#models/password_reset_token';
import { registerValidator, loginValidator } from '#validators/auth_validator';
import { logActivity } from '#services/activity_logger';
export default class AuthController {
    async register(ctx) {
        const { request, response } = ctx;
        const payload = await request.validateUsing(registerValidator);
        const existing = await User.findBy('email', payload.email);
        if (existing) {
            return response.conflict({ message: 'An account with this email already exists.' });
        }
        const defaultRole = await Role.findBy('name', 'viewer');
        const user = await User.create({
            fullName: payload.fullName,
            email: payload.email,
            password: payload.password,
            roleId: defaultRole?.id ?? null,
        });
        const token = await User.accessTokens.create(user, ['*'], {
            name: 'auth_token',
            expiresIn: '30d',
        });
        await user.load('role');
        await logActivity({ ctx, action: 'created', entityType: 'User', entityId: user.id });
        return response.created({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role ?? null,
                createdAt: user.createdAt,
            },
            token: {
                type: 'bearer',
                value: token.value.release(),
                expiresAt: token.expiresAt,
            },
        });
    }
    async login(ctx) {
        const { request, response } = ctx;
        const { email, password } = await request.validateUsing(loginValidator);
        let user;
        try {
            user = await User.verifyCredentials(email, password);
        }
        catch {
            return response.unauthorized({ message: 'Invalid email or password.' });
        }
        user.lastLogin = DateTime.now();
        await user.save();
        const token = await User.accessTokens.create(user, ['*'], {
            name: 'auth_token',
            expiresIn: '30d',
        });
        await user.load('role', (q) => q.preload('permissions'));
        await logActivity({ ctx, action: 'login', entityType: 'User', entityId: user.id, user });
        return response.ok({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                tenantId: user.tenantId,
                role: user.role
                    ? {
                        id: user.role.id,
                        name: user.role.name,
                        displayName: user.role.displayName,
                        permissions: user.role.permissions.map((p) => p.name),
                    }
                    : null,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt,
            },
            token: {
                type: 'bearer',
                value: token.value.release(),
                expiresAt: token.expiresAt,
            },
        });
    }
    async logout(ctx) {
        const { auth, response } = ctx;
        const user = auth.user;
        await User.accessTokens.delete(user, user.currentAccessToken.identifier);
        await logActivity({ ctx, action: 'logout', entityType: 'User', entityId: user.id });
        return response.ok({ message: 'Logged out successfully.' });
    }
    async me({ auth, response }) {
        const user = auth.user;
        await user.load('role', (q) => q.preload('permissions'));
        await user.load('tenant');
        return response.ok({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            tenantId: user.tenantId,
            tenant: user.tenant ?? null,
            role: user.role
                ? {
                    id: user.role.id,
                    name: user.role.name,
                    displayName: user.role.displayName,
                    permissions: user.role.permissions.map((p) => p.name),
                }
                : null,
            mfaEnabled: user.mfaEnabled,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
        });
    }
    async forgotPassword({ request, response }) {
        const { email } = request.only(['email']);
        const user = await User.findBy('email', email);
        if (!user) {
            return response.ok({ message: 'If that email exists, a reset link has been sent.' });
        }
        const token = crypto.randomBytes(32).toString('hex');
        await PasswordResetToken.create({
            userId: user.id,
            token,
            expiresAt: DateTime.now().plus({ hours: 1 }),
        });
        return response.ok({
            message: 'If that email exists, a reset link has been sent.',
            token,
        });
    }
    async resetPassword({ request, response }) {
        const { token, password } = request.only(['token', 'password']);
        const resetToken = await PasswordResetToken.findBy('token', token);
        if (!resetToken || resetToken.isExpired) {
            return response.badRequest({ message: 'Invalid or expired reset token.' });
        }
        const user = await User.findOrFail(resetToken.userId);
        user.password = password;
        await user.save();
        await resetToken.delete();
        return response.ok({ message: 'Password reset successfully.' });
    }
    async refreshToken({ auth, response }) {
        const user = auth.user;
        await User.accessTokens.delete(user, user.currentAccessToken.identifier);
        const token = await User.accessTokens.create(user, ['*'], {
            name: 'auth_token',
            expiresIn: '30d',
        });
        return response.ok({
            token: {
                type: 'bearer',
                value: token.value.release(),
                expiresAt: token.expiresAt,
            },
        });
    }
    async mfaEnroll({ auth, response }) {
        const user = auth.user;
        const rawBytes = crypto.randomBytes(20);
        const secret = new OTPAuth.Secret({ buffer: rawBytes.buffer });
        const totp = new OTPAuth.TOTP({
            issuer: 'Rislix',
            label: user.email,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret,
        });
        user.mfaSecret = secret.base32;
        user.mfaEnabled = false;
        await user.save();
        return response.ok({
            secret: secret.base32,
            otpauthUrl: totp.toString(),
        });
    }
    async mfaVerify(ctx) {
        const { request, response, auth } = ctx;
        const user = auth.user;
        const { code } = request.only(['code']);
        if (!user.mfaSecret) {
            return response.badRequest({ message: 'MFA not enrolled. Call /auth/mfa/enroll first.' });
        }
        const totp = new OTPAuth.TOTP({
            issuer: 'Rislix',
            label: user.email,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(user.mfaSecret),
        });
        const delta = totp.validate({ token: String(code), window: 1 });
        if (delta === null) {
            return response.unauthorized({ message: 'Invalid or expired MFA code.' });
        }
        if (!user.mfaEnabled) {
            user.mfaEnabled = true;
            await user.save();
        }
        await logActivity({ ctx, action: 'mfa_verified', entityType: 'User', entityId: user.id });
        return response.ok({ verified: true });
    }
}
//# sourceMappingURL=auth_controller.js.map