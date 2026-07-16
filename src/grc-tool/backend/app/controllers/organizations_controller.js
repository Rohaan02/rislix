import Organization from '#models/organization';
import { createOrgValidator, updateOrgValidator } from '#validators/organization_validator';
export default class OrganizationsController {
    async index({ response }) {
        const orgs = await Organization.query()
            .withCount('users')
            .orderBy('name', 'asc');
        return response.ok(orgs);
    }
    async show({ params, response }) {
        const org = await Organization.query()
            .where('id', params.id)
            .withCount('users')
            .firstOrFail();
        return response.ok(org);
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(createOrgValidator);
        const existing = await Organization.findBy('slug', payload.slug);
        if (existing) {
            return response.conflict({ message: `Slug "${payload.slug}" is already taken.` });
        }
        const org = await Organization.create(payload);
        return response.created(org);
    }
    async update({ params, request, response }) {
        const org = await Organization.findOrFail(params.id);
        const payload = await request.validateUsing(updateOrgValidator);
        org.merge(payload);
        await org.save();
        return response.ok(org);
    }
    async destroy({ params, response }) {
        const org = await Organization.findOrFail(params.id);
        await org.delete();
        return response.ok({ message: 'Organization deleted.' });
    }
}
//# sourceMappingURL=organizations_controller.js.map