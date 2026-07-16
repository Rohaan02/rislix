import vine from '@vinejs/vine';
import Iso27001Clause from '#models/iso27001_clause';
import Iso27001ClauseEvidence from '#models/iso27001_clause_evidence';
import Iso27001ClauseAssignment from '#models/iso27001_clause_assignment';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
import { storeUploadedFile } from '#services/file_storage';
const EVIDENCE_STATUSES = ['ready', 'not_ready', 'in_progress', 'not_applicable', 'needs_review'];
const assignValidator = vine.compile(vine.object({
    department: vine.string().trim().minLength(1).maxLength(255),
}));
const evidenceStatusValidator = vine.compile(vine.object({
    status: vine.enum(EVIDENCE_STATUSES),
    notes: vine.string().trim().maxLength(2000).optional(),
}));
export default class Iso27001ClausesController {
    async index(ctx) {
        const { response } = ctx;
        const clauses = await Iso27001Clause.query()
            .whereNull('parent_id')
            .preload('children', (q) => {
            q.orderBy('sort_order').preload('children', (q2) => q2.orderBy('sort_order'));
        })
            .orderBy('sort_order');
        return response.ok(clauses);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const clause = await Iso27001Clause.query()
            .where('id', params.id)
            .preload('children', (q) => q.orderBy('sort_order'))
            .firstOrFail();
        const evidence = await Iso27001ClauseEvidence.query()
            .where('clause_id', params.id)
            .where('tenant_id', tenantId)
            .preload('uploader', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc');
        const assignment = await Iso27001ClauseAssignment.query()
            .where('clause_id', params.id)
            .where('tenant_id', tenantId)
            .preload('assignedByUser', (q) => q.select('id', 'full_name', 'email'))
            .first();
        return response.ok({ clause, evidence, assignment });
    }
    async uploadEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { auth, params, request, response } = ctx;
        const user = auth.user;
        const clause = await Iso27001Clause.findOrFail(params.id);
        const file = request.file('file', { size: '20mb', extnames: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'] });
        if (!file)
            return response.badRequest({ message: 'No file uploaded.' });
        const fileUrl = await storeUploadedFile(file, `iso27001/clauses/${tenantId}`);
        const evidence = await Iso27001ClauseEvidence.create({
            clauseId: clause.id,
            tenantId,
            fileName: file.clientName,
            filePath: fileUrl,
            fileType: file.extname ?? null,
            status: 'in_progress',
            uploadedBy: user.id,
        });
        await evidence.load('uploader');
        await logActivity({
            ctx,
            action: 'created',
            entityType: 'Iso27001ClauseEvidence',
            entityId: evidence.id,
            metadata: { clauseNumber: clause.clauseNumber, fileName: file.clientName },
        });
        return response.created(evidence);
    }
    async updateEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const evidence = await Iso27001ClauseEvidence.query()
            .where('id', params.evidenceId)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const payload = await ctx.request.validateUsing(evidenceStatusValidator);
        evidence.status = payload.status;
        if (payload.notes !== undefined)
            evidence.notes = payload.notes;
        await evidence.save();
        await logActivity({
            ctx,
            action: 'updated',
            entityType: 'Iso27001ClauseEvidence',
            entityId: evidence.id,
            metadata: { status: payload.status },
        });
        return response.ok(evidence);
    }
    async deleteEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const evidence = await Iso27001ClauseEvidence.query()
            .where('id', params.evidenceId)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await evidence.delete();
        await logActivity({
            ctx,
            action: 'deleted',
            entityType: 'Iso27001ClauseEvidence',
            entityId: evidence.id,
        });
        return response.ok({ message: 'Evidence deleted.' });
    }
    async assign(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { auth, params, response } = ctx;
        const user = auth.user;
        await Iso27001Clause.findOrFail(params.id);
        const payload = await ctx.request.validateUsing(assignValidator);
        const existing = await Iso27001ClauseAssignment.query()
            .where('clause_id', params.id)
            .where('tenant_id', tenantId)
            .first();
        let assignment;
        if (existing) {
            existing.department = payload.department;
            existing.assignedBy = user.id;
            await existing.save();
            assignment = existing;
        }
        else {
            assignment = await Iso27001ClauseAssignment.create({
                clauseId: Number(params.id),
                tenantId,
                department: payload.department,
                assignedBy: user.id,
            });
        }
        await logActivity({
            ctx,
            action: 'updated',
            entityType: 'Iso27001ClauseAssignment',
            entityId: assignment.id,
            metadata: { department: payload.department },
        });
        return response.ok(assignment);
    }
    async unassign(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const assignment = await Iso27001ClauseAssignment.query()
            .where('clause_id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await assignment.delete();
        await logActivity({
            ctx,
            action: 'deleted',
            entityType: 'Iso27001ClauseAssignment',
            entityId: assignment.id,
        });
        return response.ok({ message: 'Assignment removed.' });
    }
    async allEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const evidence = await Iso27001ClauseEvidence.query()
            .where('tenant_id', tenantId)
            .preload('clause')
            .preload('uploader', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc');
        return response.ok(evidence);
    }
}
//# sourceMappingURL=iso27001_clauses_controller.js.map