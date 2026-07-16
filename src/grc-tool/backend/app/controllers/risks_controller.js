import { DateTime } from 'luxon';
import db from '@adonisjs/lucid/services/db';
import Risk from '#models/risk';
import RiskHistory from '#models/risk_history';
import RiskTreatment from '#models/risk_treatment';
import RiskControl from '#models/risk_control';
import TenantControl from '#models/tenant_control';
import { createRiskValidator, updateRiskValidator } from '#validators/risk_validator';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
export default class RisksController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { page = 1, perPage = 20, search, category, status, tier, ownerId, } = request.qs();
        const query = Risk.query()
            .where('tenant_id', tenantId)
            .preload('owner', (q) => q.select('id', 'full_name', 'email'))
            .preload('creator', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('risk_score', 'desc')
            .orderBy('created_at', 'desc');
        if (search)
            query.whereILike('title', `%${search}%`);
        if (category)
            query.where('category', category);
        if (status)
            query.where('status', status);
        if (tier)
            query.where('risk_tier', tier);
        if (ownerId)
            query.where('owner_id', ownerId);
        const risks = await query.paginate(Number(page), Number(perPage));
        return response.ok(risks);
    }
    async summary(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const [tierRows, statusRows, categoryRows] = await Promise.all([
            db.from('risks').where('tenant_id', tenantId).select('risk_tier').count('* as total').groupBy('risk_tier'),
            db.from('risks').where('tenant_id', tenantId).select('status').count('* as total').groupBy('status'),
            db.from('risks').where('tenant_id', tenantId).select('category').count('* as total').groupBy('category'),
        ]);
        return response.ok({
            byTier: tierRows.map((r) => ({ riskTier: r.risk_tier, total: Number(r.total) })),
            byStatus: statusRows.map((r) => ({ status: r.status, total: Number(r.total) })),
            byCategory: categoryRows.map((r) => ({ category: r.category, total: Number(r.total) })),
        });
    }
    async trend(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const rows = await Risk.query()
            .where('tenant_id', tenantId)
            .select('created_at', 'risk_tier', 'status', 'residual_score')
            .orderBy('created_at', 'asc');
        const buckets = new Map();
        for (const row of rows) {
            const weekStart = row.createdAt.startOf('week').toISODate();
            if (!buckets.has(weekStart)) {
                buckets.set(weekStart, { weekStart, total: 0, critical: 0, high: 0 });
            }
            const bucket = buckets.get(weekStart);
            bucket.total += 1;
            if (row.riskTier === 'critical')
                bucket.critical += 1;
            if (row.riskTier === 'high')
                bucket.high += 1;
        }
        const trend = Array.from(buckets.values()).sort((a, b) => a.weekStart.localeCompare(b.weekStart));
        return response.ok({ trend });
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const risk = await Risk.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .preload('owner', (q) => q.select('id', 'full_name', 'email'))
            .preload('creator', (q) => q.select('id', 'full_name', 'email'))
            .preload('controlLinks', (q) => q.preload('tenantControl', (tc) => tc.preload('control')))
            .preload('treatments')
            .preload('history', (q) => q.preload('changedByUser', (u) => u.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc')
            .limit(20))
            .firstOrFail();
        return response.ok(risk);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { auth, request, response } = ctx;
        const user = auth.user;
        const payload = await request.validateUsing(createRiskValidator);
        const { reviewDate, ...restCreate } = payload;
        const risk = await Risk.create({
            ...restCreate,
            ...(reviewDate !== undefined && { reviewDate: reviewDate ? DateTime.fromJSDate(reviewDate) : null }),
            tenantId: tenantId,
            createdBy: user.id,
            status: payload.status ?? 'open',
            approvalStatus: 'pending',
        });
        await RiskHistory.create({
            riskId: risk.id,
            likelihood: risk.likelihood,
            impact: risk.impact,
            riskScore: risk.riskScore,
            riskTier: risk.riskTier,
            status: risk.status,
            changedBy: user.id,
        });
        await risk.load('owner');
        await risk.load('creator');
        await logActivity({ ctx, action: 'created', entityType: 'Risk', entityId: risk.id });
        return response.created(risk);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { auth, params, request, response } = ctx;
        const user = auth.user;
        const risk = await Risk.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const payload = await request.validateUsing(updateRiskValidator);
        const { reviewDate, ...restUpdate } = payload;
        const extra = request.only([
            'riskCode', 'assetOrProcess', 'inherentLikelihood', 'inherentImpact',
            'residualLikelihood', 'residualImpact', 'treatmentOption', 'targetDate',
        ]);
        risk.merge({
            ...restUpdate,
            ...extra,
            updatedBy: user.id,
            ...(reviewDate !== undefined && { reviewDate: reviewDate ? DateTime.fromJSDate(reviewDate) : null }),
        });
        await risk.save();
        await RiskHistory.create({
            riskId: risk.id,
            likelihood: risk.likelihood,
            impact: risk.impact,
            riskScore: risk.riskScore,
            riskTier: risk.riskTier,
            status: risk.status,
            changedBy: user.id,
        });
        await risk.load('owner');
        await risk.load('creator');
        await logActivity({ ctx, action: 'updated', entityType: 'Risk', entityId: risk.id });
        return response.ok(risk);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const risk = await Risk.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await risk.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Risk', entityId: risk.id });
        return response.ok({ message: 'Risk deleted.' });
    }
    async addTreatment(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response, auth } = ctx;
        const risk = await Risk.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { treatmentOption, plan } = request.only(['treatmentOption', 'plan']);
        const treatment = await RiskTreatment.create({
            riskId: risk.id,
            treatmentOption,
            plan: plan ?? null,
            createdBy: auth.user.id,
        });
        risk.treatmentOption = treatmentOption;
        risk.treatment = plan ?? risk.treatment;
        risk.status = 'in_treatment';
        await risk.save();
        await logActivity({ ctx, action: 'created', entityType: 'RiskTreatment', entityId: treatment.id });
        return response.created(treatment);
    }
    async approve(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response, auth } = ctx;
        const risk = await Risk.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        risk.approvalStatus = 'approved';
        risk.approvedBy = auth.user.id;
        risk.approvedAt = DateTime.now();
        await risk.save();
        await logActivity({ ctx, action: 'approved', entityType: 'Risk', entityId: risk.id });
        return response.ok(risk);
    }
    async reject(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response, auth } = ctx;
        const risk = await Risk.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        risk.approvalStatus = 'rejected';
        risk.approvedBy = auth.user.id;
        risk.approvedAt = DateTime.now();
        await risk.save();
        await logActivity({ ctx, action: 'rejected', entityType: 'Risk', entityId: risk.id });
        return response.ok(risk);
    }
    async linkControls(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const risk = await Risk.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { tenantControlIds } = request.only(['tenantControlIds']);
        const links = [];
        for (const tenantControlId of tenantControlIds ?? []) {
            const tc = await TenantControl.query()
                .where('id', tenantControlId)
                .where('tenant_id', tenantId)
                .first();
            if (!tc)
                continue;
            const link = await RiskControl.firstOrCreate({ riskId: risk.id, tenantControlId }, { riskId: risk.id, tenantControlId });
            links.push(link);
        }
        await logActivity({ ctx, action: 'updated', entityType: 'Risk', entityId: risk.id, metadata: { linkControls: true } });
        return response.ok(links);
    }
    async updateInherent(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response, auth } = ctx;
        const risk = await Risk.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { inherentLikelihood, inherentImpact } = request.only(['inherentLikelihood', 'inherentImpact']);
        risk.inherentLikelihood = inherentLikelihood;
        risk.inherentImpact = inherentImpact;
        risk.updatedBy = auth.user.id;
        await risk.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Risk', entityId: risk.id, metadata: { scoring: 'inherent', inherentLikelihood, inherentImpact } });
        return response.ok(risk);
    }
    async updateResidual(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response, auth } = ctx;
        const risk = await Risk.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { residualLikelihood, residualImpact } = request.only(['residualLikelihood', 'residualImpact']);
        risk.residualLikelihood = residualLikelihood;
        risk.residualImpact = residualImpact;
        risk.updatedBy = auth.user.id;
        await risk.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Risk', entityId: risk.id, metadata: { scoring: 'residual', residualLikelihood, residualImpact } });
        return response.ok(risk);
    }
}
//# sourceMappingURL=risks_controller.js.map