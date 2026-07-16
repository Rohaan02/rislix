import { DateTime } from 'luxon';
import TenantControl from '#models/tenant_control';
import EvidenceControlLink from '#models/evidence_control_link';
import ControlPolicyLink from '#models/control_policy_link';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
export default class TenantControlsController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { page = 1, perPage = 20, status, frameworkId } = request.qs();
        const query = TenantControl.query()
            .where('tenant_id', tenantId)
            .preload('control', (q) => q.preload('framework'))
            .preload('owner', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc');
        if (status)
            query.where('status', status);
        if (frameworkId) {
            query.whereHas('control', (q) => q.where('framework_id', frameworkId));
        }
        const controls = await query.paginate(Number(page), Number(perPage));
        return response.ok(controls);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const control = await TenantControl.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .preload('control', (q) => q.preload('framework'))
            .preload('owner')
            .preload('evidenceLinks', (q) => q.preload('evidence'))
            .firstOrFail();
        return response.ok(control);
    }
    async updateStatus(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, auth, response } = ctx;
        const control = await TenantControl.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { status, comments } = request.only(['status', 'comments']);
        control.merge({
            status: status ?? control.status,
            comments: comments ?? control.comments,
            updatedBy: auth.user.id,
        });
        await control.save();
        await logActivity({ ctx, action: 'updated', entityType: 'TenantControl', entityId: control.id, metadata: { status } });
        return response.ok(control);
    }
    async updateOwner(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, auth, response } = ctx;
        const control = await TenantControl.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { ownerId } = request.only(['ownerId']);
        control.ownerId = ownerId ?? null;
        control.updatedBy = auth.user.id;
        await control.save();
        await logActivity({ ctx, action: 'updated', entityType: 'TenantControl', entityId: control.id, metadata: { ownerId } });
        return response.ok(control);
    }
    async recordTest(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, auth, response } = ctx;
        const control = await TenantControl.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { testResult, testNotes, nextTestDate } = request.only(['testResult', 'testNotes', 'nextTestDate']);
        control.merge({
            testResult: testResult ?? control.testResult,
            testNotes: testNotes ?? control.testNotes,
            testedBy: auth.user.id,
            testedAt: DateTime.now(),
            nextTestDate: nextTestDate ?? control.nextTestDate,
            updatedBy: auth.user.id,
        });
        await control.save();
        await logActivity({ ctx, action: 'updated', entityType: 'TenantControl', entityId: control.id, metadata: { testResult } });
        return response.ok(control);
    }
    async linkPolicy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const control = await TenantControl.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { policyId } = request.only(['policyId']);
        const link = await ControlPolicyLink.firstOrCreate({ tenantControlId: control.id, policyId }, { tenantControlId: control.id, policyId });
        await logActivity({ ctx, action: 'created', entityType: 'ControlPolicyLink', entityId: link.id });
        return response.created(link);
    }
    async unlinkPolicy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        await TenantControl.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const link = await ControlPolicyLink.query()
            .where('tenant_control_id', params.id)
            .where('policy_id', params.policyId)
            .firstOrFail();
        await link.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'ControlPolicyLink', entityId: link.id });
        return response.ok({ message: 'Policy unlinked.' });
    }
    async linkEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const control = await TenantControl.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { evidenceId } = request.only(['evidenceId']);
        const link = await EvidenceControlLink.firstOrCreate({ evidenceId, tenantControlId: control.id }, { evidenceId, tenantControlId: control.id, tenantId: tenantId });
        await logActivity({
            ctx,
            action: 'created',
            entityType: 'EvidenceControlLink',
            entityId: link.id,
        });
        return response.created(link);
    }
}
//# sourceMappingURL=tenant_controls_controller.js.map