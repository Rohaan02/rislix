import Department from '#models/department';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
export default class DepartmentsController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const departments = await Department.query()
            .where('tenant_id', tenantId)
            .orderBy('name', 'asc');
        return response.ok(departments);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const department = await Department.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        return response.ok(department);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { name, parentId } = request.only(['name', 'parentId']);
        const department = await Department.create({
            tenantId: tenantId,
            name,
            parentId: parentId ?? null,
        });
        await logActivity({ ctx, action: 'created', entityType: 'Department', entityId: department.id });
        return response.created(department);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const department = await Department.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { name, parentId } = request.only(['name', 'parentId']);
        department.merge({ name: name ?? department.name, parentId: parentId ?? department.parentId });
        await department.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Department', entityId: department.id });
        return response.ok(department);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const department = await Department.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await department.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Department', entityId: department.id });
        return response.ok({ message: 'Department deleted.' });
    }
}
//# sourceMappingURL=departments_controller.js.map