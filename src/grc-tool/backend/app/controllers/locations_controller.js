import Location from '#models/location';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
export default class LocationsController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const locations = await Location.query()
            .where('tenant_id', tenantId)
            .orderBy('name', 'asc');
        return response.ok(locations);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const location = await Location.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        return response.ok(location);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { name, address, country } = request.only(['name', 'address', 'country']);
        const location = await Location.create({
            tenantId: tenantId,
            name,
            address: address ?? null,
            country: country ?? null,
        });
        await logActivity({ ctx, action: 'created', entityType: 'Location', entityId: location.id });
        return response.created(location);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const location = await Location.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { name, address, country } = request.only(['name', 'address', 'country']);
        location.merge({
            name: name ?? location.name,
            address: address ?? location.address,
            country: country ?? location.country,
        });
        await location.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Location', entityId: location.id });
        return response.ok(location);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const location = await Location.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await location.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Location', entityId: location.id });
        return response.ok({ message: 'Location deleted.' });
    }
}
//# sourceMappingURL=locations_controller.js.map