import vine from '@vinejs/vine';
import Iso27001Control from '#models/iso27001_control';
import Iso27001ControlEvidence from '#models/iso27001_control_evidence';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
import { storeUploadedFile } from '#services/file_storage';
const EVIDENCE_STATUSES = ['ready', 'not_ready', 'in_progress', 'not_applicable', 'needs_review'];
const CATEGORIES = ['organizational', 'people', 'physical', 'technological'];
const evidenceStatusValidator = vine.compile(vine.object({
    status: vine.enum(EVIDENCE_STATUSES),
    notes: vine.string().trim().maxLength(2000).optional(),
}));
export default class Iso27001ControlsController {
    async index(ctx) {
        const { request, response } = ctx;
        const { category } = request.qs();
        const query = Iso27001Control.query().orderBy('sort_order');
        if (category && CATEGORIES.includes(category)) {
            query.where('category', category);
        }
        const controls = await query;
        return response.ok(controls);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const control = await Iso27001Control.findOrFail(params.id);
        const evidence = await Iso27001ControlEvidence.query()
            .where('control_id', params.id)
            .where('tenant_id', tenantId)
            .preload('uploader', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc');
        return response.ok({ control, evidence });
    }
    async uploadEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { auth, params, request, response } = ctx;
        const user = auth.user;
        const control = await Iso27001Control.findOrFail(params.id);
        const file = request.file('file', { size: '20mb', extnames: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'] });
        if (!file)
            return response.badRequest({ message: 'No file uploaded.' });
        const fileUrl = await storeUploadedFile(file, `iso27001/controls/${tenantId}`);
        const evidence = await Iso27001ControlEvidence.create({
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
            entityType: 'Iso27001ControlEvidence',
            entityId: evidence.id,
            metadata: { controlNumber: control.controlNumber, fileName: file.clientName },
        });
        return response.created(evidence);
    }
    async updateEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const evidence = await Iso27001ControlEvidence.query()
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
            entityType: 'Iso27001ControlEvidence',
            entityId: evidence.id,
            metadata: { status: payload.status },
        });
        return response.ok(evidence);
    }
    async deleteEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const evidence = await Iso27001ControlEvidence.query()
            .where('id', params.evidenceId)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await evidence.delete();
        await logActivity({
            ctx,
            action: 'deleted',
            entityType: 'Iso27001ControlEvidence',
            entityId: evidence.id,
        });
        return response.ok({ message: 'Evidence deleted.' });
    }
    async allEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const evidence = await Iso27001ControlEvidence.query()
            .where('tenant_id', tenantId)
            .preload('control')
            .preload('uploader', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc');
        return response.ok(evidence);
    }
}
//# sourceMappingURL=iso27001_controls_controller.js.map