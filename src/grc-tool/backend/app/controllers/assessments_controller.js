import Assessment from '#models/assessment';
import AssessmentResponse from '#models/assessment_response';
import TenantControl from '#models/tenant_control';
import Task from '#models/task';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
export default class AssessmentsController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { page = 1, perPage = 20, status } = request.qs();
        const query = Assessment.query()
            .where('tenant_id', tenantId)
            .preload('framework')
            .orderBy('created_at', 'desc');
        if (status)
            query.where('status', status);
        const assessments = await query.paginate(Number(page), Number(perPage));
        return response.ok(assessments);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const assessment = await Assessment.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .preload('framework')
            .preload('responses', (q) => q.preload('tenantControl', (tc) => tc.preload('control')))
            .firstOrFail();
        return response.ok(assessment);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response, auth } = ctx;
        const { name, frameworkId, status } = request.only(['name', 'frameworkId', 'status']);
        const assessment = await Assessment.create({
            tenantId: tenantId,
            frameworkId,
            name,
            status: status ?? 'draft',
            createdBy: auth.user.id,
        });
        const tenantControls = await TenantControl.query()
            .where('tenant_id', tenantId)
            .whereHas('control', (q) => q.where('framework_id', frameworkId));
        for (const tc of tenantControls) {
            await AssessmentResponse.firstOrCreate({ assessmentId: assessment.id, tenantControlId: tc.id }, { assessmentId: assessment.id, tenantControlId: tc.id, status: 'not_started' });
        }
        await logActivity({ ctx, action: 'created', entityType: 'Assessment', entityId: assessment.id });
        return response.created(assessment);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const assessment = await Assessment.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { name, status, startedAt, completedAt } = request.only(['name', 'status', 'startedAt', 'completedAt']);
        assessment.merge({
            name: name ?? assessment.name,
            status: status ?? assessment.status,
            startedAt: startedAt ?? assessment.startedAt,
            completedAt: completedAt ?? assessment.completedAt,
        });
        await assessment.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Assessment', entityId: assessment.id });
        return response.ok(assessment);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const assessment = await Assessment.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await assessment.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Assessment', entityId: assessment.id });
        return response.ok({ message: 'Assessment deleted.' });
    }
    async upsertResponse(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const assessment = await Assessment.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const payload = request.only([
            'tenantControlId', 'status', 'score', 'comments', 'ownerId', 'dueDate', 'evidenceId',
        ]);
        const responseRecord = await AssessmentResponse.updateOrCreate({ assessmentId: assessment.id, tenantControlId: payload.tenantControlId }, {
            assessmentId: assessment.id,
            tenantControlId: payload.tenantControlId,
            status: payload.status ?? 'not_started',
            score: payload.score ?? null,
            comments: payload.comments ?? null,
            ownerId: payload.ownerId ?? null,
            dueDate: payload.dueDate ?? null,
            evidenceId: payload.evidenceId ?? null,
        });
        if (['non_compliant', 'partially_implemented'].includes(responseRecord.status)) {
            const existing = await Task.query()
                .where('source_type', 'gap')
                .where('source_id', responseRecord.id)
                .first();
            if (!existing) {
                const tc = await TenantControl.query()
                    .where('id', responseRecord.tenantControlId)
                    .preload('control')
                    .firstOrFail();
                await Task.create({
                    tenantId: tenantId,
                    title: `Remediate gap: ${tc.control.controlTitle}`,
                    sourceType: 'gap',
                    sourceId: responseRecord.id,
                    priority: 'medium',
                    status: 'open',
                    createdBy: ctx.auth.user.id,
                });
            }
        }
        await logActivity({
            ctx,
            action: 'updated',
            entityType: 'AssessmentResponse',
            entityId: responseRecord.id,
        });
        return response.ok(responseRecord);
    }
    async listResponses(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const assessment = await Assessment.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const responses = await AssessmentResponse.query()
            .where('assessment_id', assessment.id)
            .preload('tenantControl', (q) => q.preload('control'))
            .preload('evidence');
        return response.ok(responses);
    }
}
//# sourceMappingURL=assessments_controller.js.map