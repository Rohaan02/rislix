import BusinessUnit from '#models/business_unit';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
export default class BusinessUnitsController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const units = await BusinessUnit.query()
            .where('tenant_id', tenantId)
            .orderBy('name', 'asc');
        return response.ok(units);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const unit = await BusinessUnit.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        return response.ok(unit);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { name } = request.only(['name']);
        const unit = await BusinessUnit.create({ tenantId: tenantId, name });
        await logActivity({ ctx, action: 'created', entityType: 'BusinessUnit', entityId: unit.id });
        return response.created(unit);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const unit = await BusinessUnit.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { name } = request.only(['name']);
        if (name)
            unit.name = name;
        await unit.save();
        await logActivity({ ctx, action: 'updated', entityType: 'BusinessUnit', entityId: unit.id });
        return response.ok(unit);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const unit = await BusinessUnit.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await unit.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'BusinessUnit', entityId: unit.id });
        return response.ok({ message: 'Business unit deleted.' });
    }
}
//# sourceMappingURL=business_units_controller.js.map