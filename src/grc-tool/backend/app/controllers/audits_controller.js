import Audit from '#models/audit';
import AuditFinding from '#models/audit_finding';
import AuditChecklistItem from '#models/audit_checklist_item';
import TenantControl from '#models/tenant_control';
import Task from '#models/task';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
export default class AuditsController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { page = 1, perPage = 20, status } = request.qs();
        const query = Audit.query()
            .where('tenant_id', tenantId)
            .preload('framework')
            .preload('auditor', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('created_at', 'desc');
        if (status)
            query.where('status', status);
        const audits = await query.paginate(Number(page), Number(perPage));
        return response.ok(audits);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const audit = await Audit.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .preload('framework')
            .preload('auditor')
            .preload('checklistItems', (q) => q.preload('tenantControl', (tc) => tc.preload('control')))
            .preload('findings')
            .firstOrFail();
        return response.ok(audit);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const payload = request.only([
            'auditTitle', 'auditType', 'frameworkId', 'scope', 'startDate', 'endDate', 'auditorId', 'status',
        ]);
        const audit = await Audit.create({
            tenantId: tenantId,
            auditTitle: payload.auditTitle,
            auditType: payload.auditType ?? null,
            frameworkId: payload.frameworkId ?? null,
            scope: payload.scope ?? null,
            startDate: payload.startDate ?? null,
            endDate: payload.endDate ?? null,
            auditorId: payload.auditorId ?? null,
            status: payload.status ?? 'planned',
        });
        if (payload.frameworkId) {
            const tenantControls = await TenantControl.query()
                .where('tenant_id', tenantId)
                .whereHas('control', (q) => q.where('framework_id', payload.frameworkId));
            for (const tc of tenantControls) {
                await AuditChecklistItem.create({
                    auditId: audit.id,
                    tenantControlId: tc.id,
                    checked: false,
                });
            }
        }
        await logActivity({ ctx, action: 'created', entityType: 'Audit', entityId: audit.id });
        return response.created(audit);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const audit = await Audit.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const payload = request.only([
            'auditTitle', 'auditType', 'frameworkId', 'scope', 'startDate', 'endDate', 'auditorId', 'status',
        ]);
        audit.merge({
            auditTitle: payload.auditTitle ?? audit.auditTitle,
            auditType: payload.auditType ?? audit.auditType,
            frameworkId: payload.frameworkId ?? audit.frameworkId,
            scope: payload.scope ?? audit.scope,
            startDate: payload.startDate ?? audit.startDate,
            endDate: payload.endDate ?? audit.endDate,
            auditorId: payload.auditorId ?? audit.auditorId,
            status: payload.status ?? audit.status,
        });
        await audit.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Audit', entityId: audit.id });
        return response.ok(audit);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const audit = await Audit.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await audit.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Audit', entityId: audit.id });
        return response.ok({ message: 'Audit deleted.' });
    }
    async createFinding(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response } = ctx;
        const audit = await Audit.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const payload = request.only([
            'findingTitle', 'findingType', 'severity', 'description', 'tenantControlId', 'ownerId', 'dueDate',
        ]);
        const finding = await AuditFinding.create({
            auditId: audit.id,
            findingTitle: payload.findingTitle,
            findingType: payload.findingType,
            severity: payload.severity ?? 'medium',
            description: payload.description ?? null,
            tenantControlId: payload.tenantControlId ?? null,
            ownerId: payload.ownerId ?? null,
            dueDate: payload.dueDate ?? null,
            status: 'open',
        });
        const priorityMap = { critical: 'critical', high: 'high', low: 'low' };
        await Task.create({
            tenantId: tenantId,
            title: `Corrective action: ${finding.findingTitle}`,
            sourceType: 'audit_finding',
            sourceId: finding.id,
            priority: (priorityMap[finding.severity] ?? 'medium'),
            status: 'open',
            ownerId: finding.ownerId ?? null,
            dueDate: finding.dueDate ?? null,
            createdBy: ctx.auth.user.id,
        });
        await logActivity({ ctx, action: 'created', entityType: 'AuditFinding', entityId: finding.id });
        return response.created(finding);
    }
    async closeFinding(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const finding = await AuditFinding.query()
            .where('id', params.id)
            .whereHas('audit', (q) => q.where('tenant_id', tenantId))
            .firstOrFail();
        finding.status = 'closed';
        await finding.save();
        await logActivity({ ctx, action: 'updated', entityType: 'AuditFinding', entityId: finding.id, metadata: { closed: true } });
        return response.ok(finding);
    }
}
//# sourceMappingURL=audits_controller.js.map