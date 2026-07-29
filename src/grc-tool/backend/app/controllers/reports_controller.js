import { getRequestTenantId } from '#helpers/tenant_scope';
import { logActivity } from '#services/activity_logger';
import { DateTime } from 'luxon';
import ExcelJS from 'exceljs';
import Risk from '#models/risk';
import Task from '#models/task';
import Evidence from '#models/evidence';
import Policy from '#models/policy';
import AuditFinding from '#models/audit_finding';
import TenantControl from '#models/tenant_control';
import Assessment from '#models/assessment';
import Framework from '#models/framework';
import Iso27001Clause from '#models/iso27001_clause';
import Iso27001ClauseEvidence from '#models/iso27001_clause_evidence';
import Control from '#models/control';
import FrameworkControlEvidence from '#models/framework_control_evidence';
import { calculateComplianceScore } from '#services/compliance_score';
async function xlsxResponse(response, filename, headers, rows) {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Report');
    ws.addRow(headers);
    const headerRow = ws.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1E3A5F' },
    };
    for (const row of rows) {
        ws.addRow(row);
    }
    ws.columns.forEach((col) => {
        col.width = 22;
    });
    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.header('Content-Disposition', `attachment; filename="${filename}"`);
    const buffer = await wb.xlsx.writeBuffer();
    return response.send(buffer);
}
export default class ReportsController {
    async dashboard(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const tid = tenantId;
        const tenantControls = await TenantControl.query()
            .where('tenant_id', tid)
            .select('status');
        const statuses = tenantControls.map((tc) => tc.status);
        const complianceScore = calculateComplianceScore(statuses);
        const frameworks = await Framework.query().whereIn('name', [
            'ISO 27001', 'SOC 2', 'ISO 42001', 'PCI DSS',
        ]);
        async function frameworkCompletion(frameworkName) {
            const fw = frameworks.find((f) => f.name === frameworkName);
            if (!fw)
                return 0;
            const controls = await TenantControl.query()
                .where('tenant_id', tid)
                .whereHas('control', (q) => q.where('framework_id', fw.id))
                .select('status');
            return calculateComplianceScore(controls.map((c) => c.status));
        }
        async function iso27001Completion() {
            const [totalRow] = await Iso27001Clause.query().count('* as total');
            const [readyRow] = await Iso27001ClauseEvidence.query()
                .where('tenant_id', tid)
                .where('status', 'ready')
                .countDistinct('clause_id as total');
            const total = Number(totalRow.$extras.total);
            const ready = Number(readyRow.$extras.total);
            return total > 0 ? Math.round((ready / total) * 100 * 100) / 100 : 0;
        }
        async function pciDssCompletion() {
            const pciDss = frameworks.find((f) => f.name === 'PCI DSS');
            if (!pciDss)
                return 0;
            const [totalRow] = await Control.query()
                .where('framework_id', pciDss.id)
                .whereRaw("control_code LIKE 'REQ-%.%'")
                .whereRaw("control_code NOT LIKE 'REQ-%.%.%'")
                .count('* as total');
            const [readyRow] = await FrameworkControlEvidence.query()
                .where('tenant_id', tid)
                .where('status', 'ready')
                .whereHas('control', (q) => q.where('framework_id', pciDss.id))
                .countDistinct('control_id as total');
            const total = Number(totalRow.$extras.total);
            const ready = Number(readyRow.$extras.total);
            return total > 0 ? Math.round((ready / total) * 100 * 100) / 100 : 0;
        }
        const [iso27001, soc2, iso42001, pciDss] = await Promise.all([
            iso27001Completion(),
            frameworkCompletion('SOC 2'),
            frameworkCompletion('ISO 42001'),
            pciDssCompletion(),
        ]);
        const today = DateTime.now().toISODate();
        const pciDssFramework = frameworks.find((f) => f.name === 'PCI DSS');
        const pciEvidenceBase = () => pciDssFramework
            ? FrameworkControlEvidence.query()
                .where('tenant_id', tid)
                .whereHas('control', (q) => q.where('framework_id', pciDssFramework.id))
            : null;
        const zeroRow = [{ $extras: { total: 0 } }];
        const [openRisks, closedRisks, overdueRisks, highRisks, overdueTasks, pendingEvidence, approvedEvidence, totalEvidence, openFindings, expiredPolicies, notImplemented] = await Promise.all([
            Risk.query().where('tenant_id', tid).whereNotIn('status', ['closed', 'accepted']).count('* as total'),
            Risk.query().where('tenant_id', tid).whereIn('status', ['accepted', 'closed']).count('* as total'),
            Risk.query()
                .where('tenant_id', tid)
                .whereNotNull('target_date')
                .where('target_date', '<', today)
                .whereNotIn('status', ['closed', 'accepted'])
                .count('* as total'),
            Risk.query().where('tenant_id', tid).whereIn('risk_tier', ['high', 'critical']).count('* as total'),
            Task.query().where('tenant_id', tid).where('status', 'overdue').count('* as total'),
            pciEvidenceBase()?.whereNot('status', 'ready').count('* as total') ?? Promise.resolve(zeroRow),
            pciEvidenceBase()?.where('status', 'ready').count('* as total') ?? Promise.resolve(zeroRow),
            pciEvidenceBase()?.count('* as total') ?? Promise.resolve(zeroRow),
            AuditFinding.query()
                .whereHas('audit', (q) => q.where('tenant_id', tid))
                .whereNot('status', 'closed')
                .count('* as total'),
            Policy.query()
                .where('tenant_id', tid)
                .where('status', 'expired')
                .count('* as total'),
            TenantControl.query()
                .where('tenant_id', tid)
                .whereIn('status', ['not_started', 'non_compliant'])
                .where('applicability', true)
                .count('* as total'),
        ]);
        const implemented = statuses.filter((s) => ['implemented', 'compliant'].includes(s)).length;
        const applicable = statuses.filter((s) => s !== 'not_applicable').length;
        const auditReadiness = applicable > 0 ? Math.round((implemented / applicable) * 100) : 0;
        return response.ok({
            complianceScore,
            frameworkCompletion: { iso27001, soc2, iso42001, pciDss },
            openRisks: Number(openRisks[0].$extras.total),
            closedRisks: Number(closedRisks[0].$extras.total),
            overdueRisks: Number(overdueRisks[0].$extras.total),
            highRisks: Number(highRisks[0].$extras.total),
            overdueTasks: Number(overdueTasks[0].$extras.total),
            pendingEvidence: Number(pendingEvidence[0].$extras.total),
            approvedEvidence: Number(approvedEvidence[0].$extras.total),
            approvedEvidencePct: (() => {
                const total = Number(totalEvidence[0].$extras.total);
                const approved = Number(approvedEvidence[0].$extras.total);
                return total > 0 ? Math.round((approved / total) * 100) : 0;
            })(),
            openAuditFindings: Number(openFindings[0].$extras.total),
            expiredPolicies: Number(expiredPolicies[0].$extras.total),
            controlsNotImplemented: Number(notImplemented[0].$extras.total),
            auditReadinessScore: auditReadiness,
        });
    }
    async exportGapAssessment(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const assessments = await Assessment.query()
            .where('tenant_id', tenantId)
            .preload('framework')
            .preload('responses', (q) => q.preload('tenantControl', (tc) => tc.preload('control')));
        const headers = ['Assessment', 'Framework', 'Control Code', 'Control Title', 'Status', 'Score', 'Comments'];
        const rows = [];
        for (const a of assessments) {
            for (const r of a.responses) {
                rows.push([
                    a.name,
                    a.framework.name,
                    r.tenantControl.control.controlCode,
                    r.tenantControl.control.controlTitle,
                    r.status,
                    r.score ?? null,
                    r.comments ?? '',
                ]);
            }
        }
        await logActivity({ ctx, action: 'exported', entityType: 'Report', metadata: { report: 'gap-assessment', format: 'xlsx' } });
        return xlsxResponse(response, 'gap-assessment.xlsx', headers, rows);
    }
    async exportRiskRegister(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const risks = await Risk.query()
            .where('tenant_id', tenantId)
            .preload('owner');
        const headers = ['Risk Code', 'Title', 'Category', 'Inherent Score', 'Residual Score', 'Tier', 'Status', 'Treatment', 'Owner', 'Approval Status'];
        const rows = risks.map((r) => [
            r.riskCode,
            r.title,
            r.category,
            r.inherentScore ?? null,
            r.residualScore ?? null,
            r.riskTier,
            r.status,
            r.treatmentOption ?? '',
            r.owner?.fullName ?? '',
            r.approvalStatus,
        ]);
        await logActivity({ ctx, action: 'exported', entityType: 'Report', metadata: { report: 'risk-register', format: 'xlsx' } });
        return xlsxResponse(response, 'risk-register.xlsx', headers, rows);
    }
    async exportSoa(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const controls = await TenantControl.query()
            .where('tenant_id', tenantId)
            .preload('control', (q) => q.preload('framework'));
        const headers = ['Framework', 'Control Code', 'Control Title', 'Applicable', 'Status', 'Comments'];
        const rows = controls.map((tc) => [
            tc.control.framework.name,
            tc.control.controlCode,
            tc.control.controlTitle,
            tc.applicability ? 'Yes' : 'No',
            tc.status,
            tc.comments ?? '',
        ]);
        await logActivity({ ctx, action: 'exported', entityType: 'Report', metadata: { report: 'statement-of-applicability', format: 'xlsx' } });
        return xlsxResponse(response, 'statement-of-applicability.xlsx', headers, rows);
    }
    async exportAuditReadiness(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const controls = await TenantControl.query()
            .where('tenant_id', tenantId)
            .where('applicability', true)
            .preload('control', (q) => q.preload('framework'));
        const headers = ['Framework', 'Control Code', 'Status', 'Audit Ready'];
        const rows = controls.map((tc) => [
            tc.control.framework.name,
            tc.control.controlCode,
            tc.status,
            ['implemented', 'compliant'].includes(tc.status) ? 'Yes' : 'No',
        ]);
        await logActivity({ ctx, action: 'exported', entityType: 'Report', metadata: { report: 'audit-readiness', format: 'xlsx' } });
        return xlsxResponse(response, 'audit-readiness.xlsx', headers, rows);
    }
    async exportEvidence(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const items = await Evidence.query().where('tenant_id', tenantId);
        const headers = ['Title', 'Type', 'Status', 'Version', 'Expiry Date', 'Review Date'];
        const rows = items.map((e) => [
            e.title,
            e.evidenceType,
            e.status,
            e.version,
            e.expiryDate?.toISODate() ?? '',
            e.reviewDate?.toISODate() ?? '',
        ]);
        await logActivity({ ctx, action: 'exported', entityType: 'Report', metadata: { report: 'evidence', format: 'xlsx' } });
        return xlsxResponse(response, 'evidence.xlsx', headers, rows);
    }
    async exportManagement(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const tid = tenantId;
        const [risks, tasks, findings, policies] = await Promise.all([
            Risk.query().where('tenant_id', tid).count('* as total'),
            Task.query().where('tenant_id', tid).whereNot('status', 'completed').count('* as total'),
            AuditFinding.query()
                .whereHas('audit', (q) => q.where('tenant_id', tid))
                .whereNot('status', 'closed')
                .count('* as total'),
            Policy.query().where('tenant_id', tid).where('status', 'approved').count('* as total'),
        ]);
        const headers = ['Report Date', 'Open Risks', 'Open Tasks', 'Open Findings', 'Approved Policies'];
        const rows = [[
                DateTime.now().toISODate(),
                Number(risks[0].$extras.total),
                Number(tasks[0].$extras.total),
                Number(findings[0].$extras.total),
                Number(policies[0].$extras.total),
            ]];
        await logActivity({ ctx, action: 'exported', entityType: 'Report', metadata: { report: 'management-review', format: 'xlsx' } });
        return xlsxResponse(response, 'management-review.xlsx', headers, rows);
    }
    async exportCorrective(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { response } = ctx;
        const findings = await AuditFinding.query()
            .whereHas('audit', (q) => q.where('tenant_id', tenantId))
            .whereNot('status', 'closed')
            .preload('audit');
        const headers = ['Audit', 'Finding', 'Type', 'Severity', 'Status', 'Due Date'];
        const rows = findings.map((f) => [
            f.audit.auditTitle,
            f.findingTitle,
            f.findingType,
            f.severity,
            f.status,
            f.dueDate?.toISODate() ?? '',
        ]);
        await logActivity({ ctx, action: 'exported', entityType: 'Report', metadata: { report: 'corrective-actions', format: 'xlsx' } });
        return xlsxResponse(response, 'corrective-actions.xlsx', headers, rows);
    }
}
//# sourceMappingURL=reports_controller.js.map