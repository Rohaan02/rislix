import crypto from 'node:crypto';
import { DateTime } from 'luxon';
import User from '#models/user';
import UserInvite from '#models/user_invite';
import Role from '#models/role';
import PasswordResetToken from '#models/password_reset_token';
import { updateUserValidator, inviteUserValidator } from '#validators/user_validator';
import { resolveTenantId } from '#helpers/tenant_scope';
import { logActivity } from '#services/activity_logger';
export default class UsersController {
    async index(ctx) {
        const { request, response, auth } = ctx;
        const user = auth.user;
        await user.load('role');
        const tenantId = resolveTenantId(user, request.qs().tenantId);
        const { page = 1, perPage = 20, search, roleId, status, } = request.qs();
        const query = User.query()
            .preload('role')
            .preload('tenant')
            .orderBy('created_at', 'desc');
        if (tenantId)
            query.where('tenant_id', tenantId);
        if (search) {
            query.where((q) => {
                q.whereILike('full_name', `%${search}%`).orWhereILike('email', `%${search}%`);
            });
        }
        if (roleId)
            query.where('role_id', roleId);
        if (status)
            query.where('status', status);
        const users = await query.paginate(page, perPage);
        return response.ok(users);
    }
    async show({ params, response }) {
        const user = await User.query()
            .where('id', params.id)
            .preload('role', (q) => q.preload('permissions'))
            .preload('tenant')
            .firstOrFail();
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
    async update(ctx) {
        const { params, request, response } = ctx;
        const user = await User.findOrFail(params.id);
        const payload = await request.validateUsing(updateUserValidator);
        if (payload.email && payload.email !== user.email) {
            const taken = await User.findBy('email', payload.email);
            if (taken)
                return response.conflict({ message: 'Email is already in use.' });
        }
        user.merge({
            fullName: payload.fullName ?? user.fullName,
            email: payload.email ?? user.email,
            roleId: payload.roleId ?? user.roleId,
            status: payload.status ?? user.status,
        });
        await user.save();
        await user.load('role');
        await logActivity({ ctx, action: 'updated', entityType: 'User', entityId: user.id });
        return response.ok({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            status: user.status,
            role: user.role
                ? { id: user.role.id, name: user.role.name, displayName: user.role.displayName }
                : null,
        });
    }
    async destroy(ctx) {
        const { params, auth, response } = ctx;
        const user = await User.findOrFail(params.id);
        if (user.id === auth.user.id) {
            return response.badRequest({ message: 'You cannot deactivate your own account.' });
        }
        user.status = 'inactive';
        await user.save();
        await logActivity({ ctx, action: 'deleted', entityType: 'User', entityId: user.id });
        return response.ok({ message: 'User deactivated.' });
    }
    async invite(ctx) {
        const { request, auth, response } = ctx;
        const payload = await request.validateUsing(inviteUserValidator);
        const inviter = auth.user;
        await inviter.load('role');
        const tenantId = resolveTenantId(inviter, request.qs().tenantId);
        if (!tenantId) {
            return response.badRequest({ message: 'Tenant context required for invites.' });
        }
        const existing = await UserInvite.query()
            .where('email', payload.email)
            .where('is_accepted', false)
            .where('expires_at', '>', DateTime.now().toSQL())
            .first();
        if (existing) {
            return response.conflict({ message: 'An active invite already exists for this email.' });
        }
        const existingUser = await User.findBy('email', payload.email);
        if (existingUser) {
            return response.conflict({ message: 'A user with this email already exists.' });
        }
        const role = payload.roleId
            ? await Role.find(payload.roleId)
            : await Role.findBy('name', 'viewer');
        const token = crypto.randomBytes(32).toString('hex');
        const invite = await UserInvite.create({
            email: payload.email,
            token,
            tenantId,
            roleId: role?.id ?? null,
            invitedBy: inviter.id,
            isAccepted: false,
            expiresAt: DateTime.now().plus({ days: 7 }),
        });
        await logActivity({ ctx, action: 'created', entityType: 'UserInvite', entityId: invite.id });
        return response.created({
            message: 'Invite created.',
            invite: {
                id: invite.id,
                email: invite.email,
                token: invite.token,
                expiresAt: invite.expiresAt,
                role: role ? { id: role.id, name: role.name } : null,
            },
        });
    }
    async listInvites(ctx) {
        const { auth, request, response } = ctx;
        const user = auth.user;
        await user.load('role');
        const tenantId = resolveTenantId(user, request.qs().tenantId);
        const query = UserInvite.query()
            .preload('role')
            .preload('inviter')
            .orderBy('created_at', 'desc');
        if (tenantId)
            query.where('tenant_id', tenantId);
        const invites = await query;
        return response.ok(invites);
    }
    async forcePasswordReset(ctx) {
        const { params, response } = ctx;
        const user = await User.findOrFail(params.id);
        const token = crypto.randomBytes(32).toString('hex');
        await PasswordResetToken.create({
            userId: user.id,
            token,
            expiresAt: DateTime.now().plus({ hours: 24 }),
        });
        user.status = 'active';
        await user.save();
        await logActivity({ ctx, action: 'updated', entityType: 'User', entityId: user.id, metadata: { forcePasswordReset: true } });
        return response.ok({
            message: 'Password reset token generated.',
            token,
        });
    }
}
//# sourceMappingURL=users_controller.js.map