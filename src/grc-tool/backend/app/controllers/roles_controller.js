import Role from '#models/role';
import { createRoleValidator, updateRoleValidator } from '#validators/role_validator';
import { logActivity } from '#services/activity_logger';
export default class RolesController {
    async index({ response }) {
        const roles = await Role.query().preload('permissions').orderBy('id', 'asc');
        return response.ok(roles);
    }
    async show({ params, response }) {
        const role = await Role.query()
            .where('id', params.id)
            .preload('permissions')
            .firstOrFail();
        return response.ok(role);
    }
    async store(ctx) {
        const { request, response } = ctx;
        const payload = await request.validateUsing(createRoleValidator);
        const existing = await Role.findBy('name', payload.name);
        if (existing) {
            return response.conflict({ message: `Role "${payload.name}" already exists.` });
        }
        const role = await Role.create({
            name: payload.name,
            displayName: payload.displayName,
            description: payload.description ?? null,
            isSystem: false,
        });
        if (payload.permissionIds?.length) {
            await role.related('permissions').sync(payload.permissionIds);
        }
        await role.load('permissions');
        await logActivity({ ctx, action: 'created', entityType: 'Role', entityId: role.id });
        return response.created(role);
    }
    async update(ctx) {
        const { params, request, response } = ctx;
        const role = await Role.findOrFail(params.id);
        const payload = await request.validateUsing(updateRoleValidator);
        role.merge({
            displayName: payload.displayName ?? role.displayName,
            description: payload.description ?? role.description,
        });
        await role.save();
        if (payload.permissionIds !== undefined) {
            await role.related('permissions').sync(payload.permissionIds);
        }
        await role.load('permissions');
        await logActivity({ ctx, action: 'updated', entityType: 'Role', entityId: role.id });
        return response.ok(role);
    }
    async destroy(ctx) {
        const { params, response } = ctx;
        const role = await Role.findOrFail(params.id);
        if (role.isSystem) {
            return response.forbidden({ message: 'System roles cannot be deleted.' });
        }
        await role.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Role', entityId: role.id });
        return response.ok({ message: 'Role deleted.' });
    }
}
//# sourceMappingURL=roles_controller.js.map