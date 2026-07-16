import hash from '@adonisjs/core/services/hash';
import User from '#models/user';
import UserInvite from '#models/user_invite';
import Role from '#models/role';
import { updateProfileValidator, changePasswordValidator, acceptInviteValidator, } from '#validators/user_validator';
export default class ProfileController {
    async show({ auth, response }) {
        const user = auth.user;
        await user.load('role', (q) => q.preload('permissions'));
        await user.load('tenant');
        return response.ok({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            status: user.status,
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
            createdAt: user.createdAt,
        });
    }
    async update({ auth, request, response }) {
        const user = auth.user;
        const payload = await request.validateUsing(updateProfileValidator);
        if (payload.email && payload.email !== user.email) {
            const taken = await User.findBy('email', payload.email);
            if (taken)
                return response.conflict({ message: 'Email is already in use.' });
        }
        user.merge({
            fullName: payload.fullName ?? user.fullName,
            email: payload.email ?? user.email,
        });
        await user.save();
        return response.ok({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
        });
    }
    async changePassword({ auth, request, response }) {
        const user = auth.user;
        const payload = await request.validateUsing(changePasswordValidator);
        const valid = await hash.verify(user.password, payload.currentPassword);
        if (!valid) {
            return response.unprocessableEntity({ message: 'Current password is incorrect.' });
        }
        user.password = payload.newPassword;
        await user.save();
        return response.ok({ message: 'Password updated successfully.' });
    }
    async acceptInvite({ request, response }) {
        const payload = await request.validateUsing(acceptInviteValidator);
        const invite = await UserInvite.query()
            .where('token', payload.token)
            .where('is_accepted', false)
            .preload('tenant')
            .preload('role')
            .firstOrFail();
        if (invite.isExpired) {
            return response.gone({ message: 'This invite has expired.' });
        }
        const existingUser = await User.findBy('email', invite.email);
        if (existingUser) {
            return response.conflict({ message: 'An account with this email already exists.' });
        }
        const defaultRole = invite.role ?? (await Role.findBy('name', 'viewer'));
        const user = await User.create({
            fullName: payload.fullName,
            email: invite.email,
            password: payload.password,
            roleId: defaultRole?.id ?? null,
            tenantId: invite.tenantId,
            status: 'active',
        });
        invite.isAccepted = true;
        await invite.save();
        const token = await User.accessTokens.create(user, ['*'], {
            name: 'auth_token',
            expiresIn: '30d',
        });
        return response.created({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                tenantId: user.tenantId,
            },
            token: {
                type: 'bearer',
                value: token.value.release(),
                expiresAt: token.expiresAt,
            },
        });
    }
}
//# sourceMappingURL=profile_controller.js.map