import Evidence from '#models/evidence';
import EvidenceVersion from '#models/evidence_version';
import { storeUploadedFile } from '#services/file_storage';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
export default class EvidenceController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { page = 1, perPage = 20, status, evidenceType } = request.qs();
        const query = Evidence.query()
            .where('tenant_id', tenantId)
            .preload('owner', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc');
        if (status)
            query.where('status', status);
        if (evidenceType)
            query.where('evidence_type', evidenceType);
        const items = await query.paginate(Number(page), Number(perPage));
        return response.ok(items);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const evidence = await Evidence.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .preload('owner')
            .preload('versions')
            .preload('controlLinks', (q) => q.preload('tenantControl', (tc) => tc.preload('control')))
            .firstOrFail();
        return response.ok(evidence);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response, auth } = ctx;
        const payload = request.only([
            'title', 'description', 'evidenceType', 'ownerId', 'expiryDate', 'reviewDate',
        ]);
        const evidence = await Evidence.create({
            tenantId: tenantId,
            title: payload.title,
            description: payload.description ?? null,
            evidenceType: payload.evidenceType,
            ownerId: payload.ownerId ?? null,
            expiryDate: payload.expiryDate ?? null,
            reviewDate: payload.reviewDate ?? null,
            status: 'pending',
            version: 1,
            uploadedBy: auth.user.id,
            createdBy: auth.user.id,
        });
        await logActivity({ ctx, action: 'created', entityType: 'Evidence', entityId: evidence.id });
        return response.created(evidence);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response, auth } = ctx;
        const evidence = await Evidence.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const payload = request.only([
            'title', 'description', 'ownerId', 'expiryDate', 'reviewDate', 'auditorComments',
        ]);
        evidence.merge({
            title: payload.title ?? evidence.title,
            description: payload.description ?? evidence.description,
            ownerId: payload.ownerId ?? evidence.ownerId,
            expiryDate: payload.expiryDate ?? evidence.expiryDate,
            reviewDate: payload.reviewDate ?? evidence.reviewDate,
            auditorComments: payload.auditorComments ?? evidence.auditorComments,
            updatedBy: auth.user.id,
        });
        await evidence.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Evidence', entityId: evidence.id });
        return response.ok(evidence);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const evidence = await Evidence.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await evidence.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Evidence', entityId: evidence.id });
        return response.ok({ message: 'Evidence deleted.' });
    }
    async upload(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response, auth } = ctx;
        const evidence = await Evidence.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const file = request.file('file', { size: '20mb' });
        if (!file)
            return response.badRequest({ message: 'No file uploaded.' });
        const fileUrl = await storeUploadedFile(file, `evidence/${tenantId}`);
        const newVersion = evidence.version + 1;
        evidence.fileUrl = fileUrl;
        evidence.version = newVersion;
        evidence.uploadedBy = auth.user.id;
        await evidence.save();
        await EvidenceVersion.create({
            evidenceId: evidence.id,
            versionNumber: newVersion,
            fileUrl,
            uploadedBy: auth.user.id,
        });
        await logActivity({ ctx, action: 'updated', entityType: 'Evidence', entityId: evidence.id, metadata: { upload: true } });
        return response.ok(evidence);
    }
    async approve(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const evidence = await Evidence.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        evidence.status = 'approved';
        await evidence.save();
        await logActivity({ ctx, action: 'approved', entityType: 'Evidence', entityId: evidence.id });
        return response.ok(evidence);
    }
    async reject(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const evidence = await Evidence.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { auditorComments } = request.only(['auditorComments']);
        evidence.status = 'rejected';
        if (auditorComments)
            evidence.auditorComments = auditorComments;
        await evidence.save();
        await logActivity({ ctx, action: 'rejected', entityType: 'Evidence', entityId: evidence.id });
        return response.ok(evidence);
    }
}
//# sourceMappingURL=evidence_controller.js.map