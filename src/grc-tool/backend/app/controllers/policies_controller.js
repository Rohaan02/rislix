import { DateTime } from 'luxon';
import Policy from '#models/policy';
import PolicyVersion from '#models/policy_version';
import PolicyAcknowledgment from '#models/policy_acknowledgment';
import { storeUploadedFile } from '#services/file_storage';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
export default class PoliciesController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { page = 1, perPage = 20, status } = request.qs();
        const query = Policy.query()
            .where('tenant_id', tenantId)
            .where('is_template', false)
            .preload('owner', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc');
        if (status)
            query.where('status', status);
        const policies = await query.paginate(Number(page), Number(perPage));
        return response.ok(policies);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const policy = await Policy.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .preload('owner')
            .preload('versions', (q) => q.orderBy('version_number', 'desc'))
            .firstOrFail();
        return response.ok(policy);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const payload = request.only([
            'title', 'documentType', 'ownerId', 'status', 'reviewFrequency', 'nextReviewDate',
        ]);
        const policy = await Policy.create({
            tenantId: tenantId,
            title: payload.title,
            documentType: payload.documentType ?? null,
            ownerId: payload.ownerId ?? null,
            status: payload.status ?? 'draft',
            reviewFrequency: payload.reviewFrequency ?? null,
            nextReviewDate: payload.nextReviewDate ?? null,
            isTemplate: false,
        });
        await PolicyVersion.create({
            policyId: policy.id,
            versionNumber: 1,
            status: policy.status,
        });
        await logActivity({ ctx, action: 'created', entityType: 'Policy', entityId: policy.id });
        return response.created(policy);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const policy = await Policy.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const payload = request.only([
            'title', 'documentType', 'ownerId', 'status', 'reviewFrequency', 'nextReviewDate',
        ]);
        policy.merge({
            title: payload.title ?? policy.title,
            documentType: payload.documentType ?? policy.documentType,
            ownerId: payload.ownerId ?? policy.ownerId,
            status: payload.status ?? policy.status,
            reviewFrequency: payload.reviewFrequency ?? policy.reviewFrequency,
            nextReviewDate: payload.nextReviewDate ?? policy.nextReviewDate,
        });
        await policy.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Policy', entityId: policy.id });
        return response.ok(policy);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const policy = await Policy.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await policy.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Policy', entityId: policy.id });
        return response.ok({ message: 'Policy deleted.' });
    }
    async createFromTemplate(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const template = await Policy.query()
            .where('id', params.templateId)
            .where('is_template', true)
            .firstOrFail();
        const { title } = request.only(['title']);
        const policy = await Policy.create({
            tenantId: tenantId,
            title: title ?? template.title,
            documentType: template.documentType,
            reviewFrequency: template.reviewFrequency,
            isTemplate: false,
            status: 'draft',
        });
        await PolicyVersion.create({ policyId: policy.id, versionNumber: 1, status: 'draft' });
        await logActivity({ ctx, action: 'created', entityType: 'Policy', entityId: policy.id, metadata: { fromTemplate: template.id } });
        return response.created(policy);
    }
    async createVersion(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response, auth } = ctx;
        const policy = await Policy.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const latest = await PolicyVersion.query()
            .where('policy_id', policy.id)
            .orderBy('version_number', 'desc')
            .first();
        const versionNumber = (latest?.versionNumber ?? 0) + 1;
        const { status } = request.only(['status']);
        let fileUrl = null;
        const file = request.file('file', { size: '20mb' });
        if (file) {
            fileUrl = await storeUploadedFile(file, `policies/${tenantId}`);
        }
        const version = await PolicyVersion.create({
            policyId: policy.id,
            versionNumber,
            fileUrl,
            status: (status ?? 'draft'),
        });
        if (status === 'approved') {
            version.approvedBy = auth.user.id;
            version.approvedAt = DateTime.now();
            await version.save();
            policy.status = 'approved';
            await policy.save();
        }
        await logActivity({ ctx, action: 'created', entityType: 'PolicyVersion', entityId: version.id });
        return response.created(version);
    }
    async listVersions(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const policy = await Policy.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const versions = await PolicyVersion.query()
            .where('policy_id', policy.id)
            .orderBy('version_number', 'desc');
        return response.ok(versions);
    }
    async acknowledge(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, auth, response } = ctx;
        const policy = await Policy.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const latest = await PolicyVersion.query()
            .where('policy_id', policy.id)
            .orderBy('version_number', 'desc')
            .firstOrFail();
        const uid = auth.user.id;
        const ack = await PolicyAcknowledgment.firstOrCreate({ userId: uid, policyVersionId: latest.id }, { userId: uid, policyVersionId: latest.id, acknowledgedAt: DateTime.now() });
        await logActivity({ ctx, action: 'created', entityType: 'PolicyAcknowledgment', entityId: ack.id });
        return response.ok(ack);
    }
}
//# sourceMappingURL=policies_controller.js.map