import Tenant from '#models/tenant';
import { createTenantValidator, updateTenantValidator } from '#validators/tenant_validator';
import { logActivity } from '#services/activity_logger';
export default class TenantsController {
    async index(ctx) {
        const { auth, response } = ctx;
        const user = auth.user;
        await user.load('role');
        const query = Tenant.query().withCount('users').orderBy('name', 'asc');
        if (user.role?.name !== 'super_admin') {
            if (!user.tenantId) {
                return response.forbidden({ message: 'No tenant assigned.' });
            }
            query.where('id', user.tenantId);
        }
        const tenants = await query;
        return response.ok(tenants);
    }
    async show(ctx) {
        const { params, auth, response } = ctx;
        const user = auth.user;
        await user.load('role');
        const query = Tenant.query().where('id', params.id).withCount('users');
        if (user.role?.name !== 'super_admin' && user.tenantId !== Number(params.id)) {
            return response.forbidden({ message: 'Access denied.' });
        }
        const tenant = await query.firstOrFail();
        return response.ok(tenant);
    }
    async store(ctx) {
        const { request, response, auth } = ctx;
        const user = auth.user;
        await user.load('role');
        if (user.role?.name !== 'super_admin') {
            return response.forbidden({ message: 'Only super admins can create tenants.' });
        }
        const payload = await request.validateUsing(createTenantValidator);
        const existing = await Tenant.findBy('slug', payload.slug);
        if (existing) {
            return response.conflict({ message: `Slug "${payload.slug}" is already taken.` });
        }
        const tenant = await Tenant.create({ ...payload, updatedBy: user.id });
        await logActivity({ ctx, action: 'created', entityType: 'Tenant', entityId: tenant.id });
        return response.created(tenant);
    }
    async update(ctx) {
        const { params, request, response, auth } = ctx;
        const user = auth.user;
        await user.load('role');
        if (user.role?.name !== 'super_admin' && user.tenantId !== Number(params.id)) {
            return response.forbidden({ message: 'Access denied.' });
        }
        const tenant = await Tenant.findOrFail(params.id);
        const payload = await request.validateUsing(updateTenantValidator);
        tenant.merge({ ...payload, updatedBy: user.id });
        await tenant.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Tenant', entityId: tenant.id });
        return response.ok(tenant);
    }
    async destroy(ctx) {
        const { params, response, auth } = ctx;
        const user = auth.user;
        await user.load('role');
        if (user.role?.name !== 'super_admin') {
            return response.forbidden({ message: 'Only super admins can delete tenants.' });
        }
        const tenant = await Tenant.findOrFail(params.id);
        await tenant.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Tenant', entityId: tenant.id });
        return response.ok({ message: 'Tenant deleted.' });
    }
}
//# sourceMappingURL=tenants_controller.js.map