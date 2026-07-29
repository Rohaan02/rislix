import vine from '@vinejs/vine';
import Control from '#models/control';
import FrameworkControlEvidence from '#models/framework_control_evidence';
import FrameworkControlAssignment from '#models/framework_control_assignment';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
import { storeUploadedFile } from '#services/file_storage';
const EVIDENCE_STATUSES = ['ready', 'not_ready', 'in_progress', 'not_applicable', 'needs_review'];
const evidenceStatusValidator = vine.compile(vine.object({
    status: vine.enum(EVIDENCE_STATUSES),
    notes: vine.string().trim().maxLength(2000).optional(),
}));
const assignValidator = vine.compile(vine.object({
    department: vine.string().trim().minLength(1).maxLength(255),
}));
export default class FrameworkControlsController {
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const control = await Control.findOrFail(params.id);
        const evidence = await FrameworkControlEvidence.query()
            .where('control_id', params.id)
            .where('tenant_id', tenantId)
            .preload('uploader', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc');
        const assignment = await FrameworkControlAssignment.query()
            .where('control_id', params.id)
            .where('tenant_id', tenantId)
            .preload('assignedByUser', (q) => q.select('id', 'full_name', 'email'))
            .first();
        return response.ok({ control, evidence, assignment: assignment ?? null });
    }
    async uploadEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { auth, params, request, response } = ctx;
        const user = auth.user;
        const control = await Control.findOrFail(params.id);
        const file = request.file('file', {
            size: '20mb',
            extnames: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
        });
        if (!file)
            return response.badRequest({ message: 'No file uploaded.' });
        const fileUrl = await storeUploadedFile(file, `framework-controls/${tenantId}`);
        const evidence = await FrameworkControlEvidence.create({
            controlId: control.id,
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
            entityType: 'FrameworkControlEvidence',
            entityId: evidence.id,
            metadata: { controlCode: control.controlCode, fileName: file.clientName },
        });
        return response.created(evidence);
    }
    async updateEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const evidence = await FrameworkControlEvidence.query()
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
            entityType: 'FrameworkControlEvidence',
            entityId: evidence.id,
            metadata: { status: payload.status },
        });
        return response.ok(evidence);
    }
    async deleteEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const evidence = await FrameworkControlEvidence.query()
            .where('id', params.evidenceId)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await evidence.delete();
        await logActivity({
            ctx,
            action: 'deleted',
            entityType: 'FrameworkControlEvidence',
            entityId: evidence.id,
        });
        return response.ok({ message: 'Evidence deleted.' });
    }
    async assign(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { auth, params, response } = ctx;
        const user = auth.user;
        await Control.findOrFail(params.id);
        const payload = await ctx.request.validateUsing(assignValidator);
        const existing = await FrameworkControlAssignment.query()
            .where('control_id', params.id)
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
            assignment = await FrameworkControlAssignment.create({
                controlId: Number(params.id),
                tenantId,
                department: payload.department,
                assignedBy: user.id,
            });
        }
        await assignment.load('assignedByUser');
        await logActivity({
            ctx,
            action: 'updated',
            entityType: 'FrameworkControlAssignment',
            entityId: assignment.id,
            metadata: { department: payload.department },
        });
        return response.ok(assignment);
    }
    async unassign(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const assignment = await FrameworkControlAssignment.query()
            .where('control_id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await assignment.delete();
        await logActivity({
            ctx,
            action: 'deleted',
            entityType: 'FrameworkControlAssignment',
            entityId: assignment.id,
        });
        return response.ok({ message: 'Assignment removed.' });
    }
}
//# sourceMappingURL=framework_controls_controller.js.map