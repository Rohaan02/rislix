import { DateTime } from 'luxon';
import vine from '@vinejs/vine';
import Opportunity from '#models/opportunity';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
const STATUSES = ['open', 'in_progress', 'closed', 'planned'];
const LEVELS = ['low', 'medium', 'high'];
const createValidator = vine.compile(vine.object({
    opportunityCode: vine.string().trim().maxLength(50).optional(),
    title: vine.string().trim().minLength(3).maxLength(500),
    description: vine.string().trim().maxLength(2000).optional(),
    sourceOrTrigger: vine.string().trim().maxLength(500).optional(),
    affectedArea: vine.string().trim().maxLength(500).optional(),
    opportunityType: vine.string().trim().maxLength(100).optional(),
    potentialBenefit: vine.string().trim().maxLength(2000).optional(),
    likelihood: vine.enum(LEVELS).optional(),
    impact: vine.enum(LEVELS).optional(),
    priority: vine.enum(LEVELS).optional(),
    actionsRequired: vine.string().trim().maxLength(2000).optional(),
    ownerId: vine.number().optional(),
    targetDate: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
    status: vine.enum(STATUSES).optional(),
}));
const updateValidator = vine.compile(vine.object({
    opportunityCode: vine.string().trim().maxLength(50).optional(),
    title: vine.string().trim().minLength(3).maxLength(500).optional(),
    description: vine.string().trim().maxLength(2000).optional(),
    sourceOrTrigger: vine.string().trim().maxLength(500).optional(),
    affectedArea: vine.string().trim().maxLength(500).optional(),
    opportunityType: vine.string().trim().maxLength(100).optional(),
    potentialBenefit: vine.string().trim().maxLength(2000).optional(),
    likelihood: vine.enum(LEVELS).optional(),
    impact: vine.enum(LEVELS).optional(),
    priority: vine.enum(LEVELS).optional(),
    actionsRequired: vine.string().trim().maxLength(2000).optional(),
    ownerId: vine.number().optional(),
    targetDate: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
    status: vine.enum(STATUSES).optional(),
}));
export default class OpportunitiesController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { page = 1, perPage = 50, status } = request.qs();
        const query = Opportunity.query()
            .where('tenant_id', tenantId)
            .preload('owner', (q) => q.select('id', 'full_name', 'email'))
            .preload('creator', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc');
        if (status)
            query.where('status', status);
        const items = await query.paginate(Number(page), Number(perPage));
        return response.ok(items);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const item = await Opportunity.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .preload('owner', (q) => q.select('id', 'full_name', 'email'))
            .preload('creator', (q) => q.select('id', 'full_name', 'email'))
            .firstOrFail();
        return response.ok(item);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { auth, response } = ctx;
        const user = auth.user;
        const payload = await ctx.request.validateUsing(createValidator);
        const { targetDate, ...restCreate } = payload;
        const item = await Opportunity.create({
            ...restCreate,
            ...(targetDate !== undefined && { targetDate: targetDate ? DateTime.fromJSDate(targetDate) : null }),
            tenantId,
            createdBy: user.id,
            status: payload.status ?? 'open',
            likelihood: payload.likelihood ?? 'medium',
            impact: payload.impact ?? 'medium',
            priority: payload.priority ?? 'medium',
        });
        await item.load('owner');
        await item.load('creator');
        await logActivity({ ctx, action: 'created', entityType: 'Opportunity', entityId: item.id });
        return response.created(item);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const item = await Opportunity.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const payload = await ctx.request.validateUsing(updateValidator);
        const { targetDate, ...restUpdate } = payload;
        item.merge({
            ...restUpdate,
            ...(targetDate !== undefined && { targetDate: targetDate ? DateTime.fromJSDate(targetDate) : null }),
        });
        await item.save();
        await item.load('owner');
        await item.load('creator');
        await logActivity({ ctx, action: 'updated', entityType: 'Opportunity', entityId: item.id });
        return response.ok(item);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const item = await Opportunity.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await item.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Opportunity', entityId: item.id });
        return response.ok({ message: 'Opportunity deleted.' });
    }
}
//# sourceMappingURL=opportunities_controller.js.map