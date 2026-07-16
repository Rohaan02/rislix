import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
const AuthController = () => import('#controllers/auth_controller');
const ProfileController = () => import('#controllers/profile_controller');
const RolesController = () => import('#controllers/roles_controller');
const PermissionsController = () => import('#controllers/permissions_controller');
const UsersController = () => import('#controllers/users_controller');
const TenantsController = () => import('#controllers/tenants_controller');
const RisksController = () => import('#controllers/risks_controller');
const ActivityLogsController = () => import('#controllers/activity_logs_controller');
const DepartmentsController = () => import('#controllers/departments_controller');
const LocationsController = () => import('#controllers/locations_controller');
const BusinessUnitsController = () => import('#controllers/business_units_controller');
const FrameworksController = () => import('#controllers/frameworks_controller');
const TenantControlsController = () => import('#controllers/tenant_controls_controller');
const AssessmentsController = () => import('#controllers/assessments_controller');
const EvidenceController = () => import('#controllers/evidence_controller');
const PoliciesController = () => import('#controllers/policies_controller');
const AuditsController = () => import('#controllers/audits_controller');
const TasksController = () => import('#controllers/tasks_controller');
const ReportsController = () => import('#controllers/reports_controller');
const OpportunitiesController = () => import('#controllers/opportunities_controller');
const Iso27001ClausesController = () => import('#controllers/iso27001_clauses_controller');
const Iso27001ControlsController = () => import('#controllers/iso27001_controls_controller');
const InventoryController = () => import('#controllers/inventory_controller');
router.get('/api/health', async () => {
    return { status: 'ok', app: 'Rislix GRC Tool', version: '0.1.0' };
});
router.group(() => {
    router.group(() => {
        router.post('/register', [AuthController, 'register']).use(middleware.rateLimit());
        router.post('/login', [AuthController, 'login']).use(middleware.rateLimit());
        router.post('/forgot-password', [AuthController, 'forgotPassword']).use(middleware.rateLimit());
        router.post('/reset-password', [AuthController, 'resetPassword']).use(middleware.rateLimit());
        router.post('/accept-invite', [ProfileController, 'acceptInvite']);
    }).prefix('/auth');
    router.group(() => {
        router.delete('/auth/logout', [AuthController, 'logout']);
        router.get('/auth/me', [AuthController, 'me']);
        router.post('/auth/refresh-token', [AuthController, 'refreshToken']);
        router.post('/auth/mfa/verify', [AuthController, 'mfaVerify']);
        router.post('/auth/mfa/enroll', [AuthController, 'mfaEnroll']);
    }).use(middleware.auth());
    router.group(() => {
        router.get('/', [ProfileController, 'show']);
        router.put('/', [ProfileController, 'update']);
        router.put('/password', [ProfileController, 'changePassword']);
    }).prefix('/profile').use(middleware.auth());
    router.group(() => {
        router.get('/permissions', [PermissionsController, 'index'])
            .use(middleware.permission({ permissions: ['roles:view'] }));
        router.get('/roles', [RolesController, 'index'])
            .use(middleware.permission({ permissions: ['roles:view'] }));
        router.get('/roles/:id', [RolesController, 'show'])
            .use(middleware.permission({ permissions: ['roles:view'] }));
        router.post('/roles', [RolesController, 'store'])
            .use(middleware.permission({ permissions: ['roles:manage'] }));
        router.put('/roles/:id', [RolesController, 'update'])
            .use(middleware.permission({ permissions: ['roles:manage'] }));
        router.delete('/roles/:id', [RolesController, 'destroy'])
            .use(middleware.permission({ permissions: ['roles:manage'] }));
    }).use(middleware.auth());
    router.group(() => {
        router.get('/', [TenantsController, 'index']);
        router.get('/:id', [TenantsController, 'show']);
        router.post('/', [TenantsController, 'store'])
            .use(middleware.permission({ permissions: ['tenants:manage'] }));
        router.put('/:id', [TenantsController, 'update']);
        router.delete('/:id', [TenantsController, 'destroy'])
            .use(middleware.permission({ permissions: ['tenants:manage'] }));
    }).prefix('/tenants').use(middleware.auth());
    router.group(() => {
        router.get('/', [UsersController, 'index'])
            .use(middleware.permission({ permissions: ['users:view'] }));
        router.get('/invites', [UsersController, 'listInvites'])
            .use(middleware.permission({ permissions: ['users:view'] }));
        router.post('/invite', [UsersController, 'invite'])
            .use(middleware.permission({ permissions: ['users:create'] }));
        router.get('/:id', [UsersController, 'show'])
            .use(middleware.permission({ permissions: ['users:view'] }));
        router.put('/:id', [UsersController, 'update'])
            .use(middleware.permission({ permissions: ['users:edit'] }));
        router.post('/:id/force-password-reset', [UsersController, 'forcePasswordReset'])
            .use(middleware.permission({ permissions: ['users:edit'] }));
        router.delete('/:id', [UsersController, 'destroy'])
            .use(middleware.permission({ permissions: ['users:delete'] }));
    }).prefix('/users').use(middleware.auth());
    router.group(() => {
        router.get('/', [ActivityLogsController, 'index'])
            .use(middleware.permission({ permissions: ['activity_logs:view'] }));
    }).prefix('/activity-logs').use(middleware.auth());
    router.group(() => {
        router.group(() => {
            router.get('/', [DepartmentsController, 'index']);
            router.get('/:id', [DepartmentsController, 'show']);
            router.post('/', [DepartmentsController, 'store']);
            router.put('/:id', [DepartmentsController, 'update']);
            router.delete('/:id', [DepartmentsController, 'destroy']);
        }).prefix('/departments');
        router.group(() => {
            router.get('/', [LocationsController, 'index']);
            router.get('/:id', [LocationsController, 'show']);
            router.post('/', [LocationsController, 'store']);
            router.put('/:id', [LocationsController, 'update']);
            router.delete('/:id', [LocationsController, 'destroy']);
        }).prefix('/locations');
        router.group(() => {
            router.get('/', [BusinessUnitsController, 'index']);
            router.get('/:id', [BusinessUnitsController, 'show']);
            router.post('/', [BusinessUnitsController, 'store']);
            router.put('/:id', [BusinessUnitsController, 'update']);
            router.delete('/:id', [BusinessUnitsController, 'destroy']);
        }).prefix('/business-units');
        router.group(() => {
            router.get('/', [FrameworksController, 'index'])
                .use(middleware.permission({ permissions: ['controls:view'] }));
            router.post('/', [FrameworksController, 'store'])
                .use(middleware.permission({ permissions: ['controls:create'] }));
            router.get('/:id', [FrameworksController, 'show'])
                .use(middleware.permission({ permissions: ['controls:view'] }));
            router.get('/:id/controls', [FrameworksController, 'controls'])
                .use(middleware.permission({ permissions: ['controls:view'] }));
        }).prefix('/frameworks');
        router.post('/tenants/:tenantId/frameworks/:frameworkId/assign', [FrameworksController, 'assignToTenant'])
            .use(middleware.permission({ permissions: ['controls:create'] }));
        router.group(() => {
            router.get('/', [TenantControlsController, 'index'])
                .use(middleware.permission({ permissions: ['controls:view'] }));
            router.get('/:id', [TenantControlsController, 'show'])
                .use(middleware.permission({ permissions: ['controls:view'] }));
            router.put('/:id/status', [TenantControlsController, 'updateStatus'])
                .use(middleware.permission({ permissions: ['controls:edit'] }));
            router.put('/:id/owner', [TenantControlsController, 'updateOwner'])
                .use(middleware.permission({ permissions: ['controls:edit'] }));
            router.post('/:id/evidence', [TenantControlsController, 'linkEvidence'])
                .use(middleware.permission({ permissions: ['evidence:create'] }));
            router.put('/:id/test', [TenantControlsController, 'recordTest'])
                .use(middleware.permission({ permissions: ['controls:edit'] }));
            router.post('/:id/policies', [TenantControlsController, 'linkPolicy'])
                .use(middleware.permission({ permissions: ['controls:edit'] }));
            router.delete('/:id/policies/:policyId', [TenantControlsController, 'unlinkPolicy'])
                .use(middleware.permission({ permissions: ['controls:edit'] }));
        }).prefix('/tenant-controls');
        router.group(() => {
            router.get('/', [AssessmentsController, 'index'])
                .use(middleware.permission({ permissions: ['assessments:view'] }));
            router.post('/', [AssessmentsController, 'store'])
                .use(middleware.permission({ permissions: ['assessments:create'] }));
            router.get('/:id', [AssessmentsController, 'show'])
                .use(middleware.permission({ permissions: ['assessments:view'] }));
            router.put('/:id', [AssessmentsController, 'update'])
                .use(middleware.permission({ permissions: ['assessments:edit'] }));
            router.delete('/:id', [AssessmentsController, 'destroy'])
                .use(middleware.permission({ permissions: ['assessments:delete'] }));
            router.get('/:id/responses', [AssessmentsController, 'listResponses'])
                .use(middleware.permission({ permissions: ['assessments:view'] }));
            router.post('/:id/responses', [AssessmentsController, 'upsertResponse'])
                .use(middleware.permission({ permissions: ['assessments:edit'] }));
        }).prefix('/assessments');
        router.group(() => {
            router.get('/', [EvidenceController, 'index'])
                .use(middleware.permission({ permissions: ['evidence:view'] }));
            router.post('/', [EvidenceController, 'store'])
                .use(middleware.permission({ permissions: ['evidence:create'] }));
            router.get('/:id', [EvidenceController, 'show'])
                .use(middleware.permission({ permissions: ['evidence:view'] }));
            router.put('/:id', [EvidenceController, 'update'])
                .use(middleware.permission({ permissions: ['evidence:edit'] }));
            router.delete('/:id', [EvidenceController, 'destroy'])
                .use(middleware.permission({ permissions: ['evidence:delete'] }));
            router.post('/:id/upload', [EvidenceController, 'upload'])
                .use(middleware.permission({ permissions: ['evidence:edit'] }));
            router.put('/:id/approve', [EvidenceController, 'approve'])
                .use(middleware.permission({ permissions: ['evidence:approve'] }));
            router.put('/:id/reject', [EvidenceController, 'reject'])
                .use(middleware.permission({ permissions: ['evidence:approve'] }));
        }).prefix('/evidence');
        router.group(() => {
            router.get('/', [PoliciesController, 'index'])
                .use(middleware.permission({ permissions: ['policies:view'] }));
            router.post('/', [PoliciesController, 'store'])
                .use(middleware.permission({ permissions: ['policies:create'] }));
            router.get('/:id', [PoliciesController, 'show'])
                .use(middleware.permission({ permissions: ['policies:view'] }));
            router.put('/:id', [PoliciesController, 'update'])
                .use(middleware.permission({ permissions: ['policies:edit'] }));
            router.delete('/:id', [PoliciesController, 'destroy'])
                .use(middleware.permission({ permissions: ['policies:delete'] }));
            router.get('/:id/versions', [PoliciesController, 'listVersions'])
                .use(middleware.permission({ permissions: ['policies:view'] }));
            router.post('/:id/versions', [PoliciesController, 'createVersion'])
                .use(middleware.permission({ permissions: ['policies:edit'] }));
            router.post('/:id/acknowledge', [PoliciesController, 'acknowledge'])
                .use(middleware.permission({ permissions: ['policies:view'] }));
            router.post('/from-template/:templateId', [PoliciesController, 'createFromTemplate'])
                .use(middleware.permission({ permissions: ['policies:create'] }));
        }).prefix('/policies');
        router.group(() => {
            router.get('/', [AuditsController, 'index'])
                .use(middleware.permission({ permissions: ['audits:view'] }));
            router.post('/', [AuditsController, 'store'])
                .use(middleware.permission({ permissions: ['audits:create'] }));
            router.get('/:id', [AuditsController, 'show'])
                .use(middleware.permission({ permissions: ['audits:view'] }));
            router.put('/:id', [AuditsController, 'update'])
                .use(middleware.permission({ permissions: ['audits:edit'] }));
            router.delete('/:id', [AuditsController, 'destroy'])
                .use(middleware.permission({ permissions: ['audits:delete'] }));
            router.post('/:id/findings', [AuditsController, 'createFinding'])
                .use(middleware.permission({ permissions: ['audits:edit'] }));
        }).prefix('/audits');
        router.put('/audit-findings/:id/close', [AuditsController, 'closeFinding'])
            .use(middleware.permission({ permissions: ['audits:edit'] }));
        router.group(() => {
            router.get('/', [TasksController, 'index'])
                .use(middleware.permission({ permissions: ['tasks:view'] }));
            router.post('/', [TasksController, 'store'])
                .use(middleware.permission({ permissions: ['tasks:create'] }));
            router.get('/:id', [TasksController, 'show'])
                .use(middleware.permission({ permissions: ['tasks:view'] }));
            router.put('/:id', [TasksController, 'update'])
                .use(middleware.permission({ permissions: ['tasks:edit'] }));
            router.delete('/:id', [TasksController, 'destroy'])
                .use(middleware.permission({ permissions: ['tasks:delete'] }));
            router.put('/:id/complete', [TasksController, 'complete'])
                .use(middleware.permission({ permissions: ['tasks:edit'] }));
            router.put('/:id/escalate', [TasksController, 'escalate'])
                .use(middleware.permission({ permissions: ['tasks:edit'] }));
            router.post('/:id/comments', [TasksController, 'addComment'])
                .use(middleware.permission({ permissions: ['tasks:edit'] }));
            router.post('/:id/attachments', [TasksController, 'addAttachment'])
                .use(middleware.permission({ permissions: ['tasks:edit'] }));
        }).prefix('/tasks');
        router.group(() => {
            router.get('/summary', [RisksController, 'summary'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.get('/trend', [RisksController, 'trend'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.get('/', [RisksController, 'index'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.get('/:id', [RisksController, 'show'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.post('/', [RisksController, 'store'])
                .use(middleware.permission({ permissions: ['risks:create'] }));
            router.put('/:id', [RisksController, 'update'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.delete('/:id', [RisksController, 'destroy'])
                .use(middleware.permission({ permissions: ['risks:delete'] }));
            router.post('/:id/treatment', [RisksController, 'addTreatment'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.put('/:id/approve', [RisksController, 'approve'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.put('/:id/reject', [RisksController, 'reject'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.post('/:id/controls', [RisksController, 'linkControls'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.put('/:id/inherent', [RisksController, 'updateInherent'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.put('/:id/residual', [RisksController, 'updateResidual'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
        }).prefix('/risks');
        router.group(() => {
            router.get('/', [OpportunitiesController, 'index'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.get('/:id', [OpportunitiesController, 'show'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.post('/', [OpportunitiesController, 'store'])
                .use(middleware.permission({ permissions: ['risks:create'] }));
            router.put('/:id', [OpportunitiesController, 'update'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.delete('/:id', [OpportunitiesController, 'destroy'])
                .use(middleware.permission({ permissions: ['risks:delete'] }));
        }).prefix('/opportunities');
        router.group(() => {
            router.get('/', [Iso27001ClausesController, 'index'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.get('/evidence', [Iso27001ClausesController, 'allEvidence'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.get('/:id', [Iso27001ClausesController, 'show'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.post('/:id/evidence', [Iso27001ClausesController, 'uploadEvidence'])
                .use(middleware.permission({ permissions: ['risks:create'] }));
            router.put('/:id/evidence/:evidenceId', [Iso27001ClausesController, 'updateEvidence'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.delete('/:id/evidence/:evidenceId', [Iso27001ClausesController, 'deleteEvidence'])
                .use(middleware.permission({ permissions: ['risks:delete'] }));
            router.post('/:id/assign', [Iso27001ClausesController, 'assign'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.delete('/:id/assign', [Iso27001ClausesController, 'unassign'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
        }).prefix('/iso27001/clauses');
        router.group(() => {
            router.get('/', [Iso27001ControlsController, 'index'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.get('/evidence', [Iso27001ControlsController, 'allEvidence'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.get('/:id', [Iso27001ControlsController, 'show'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.post('/:id/evidence', [Iso27001ControlsController, 'uploadEvidence'])
                .use(middleware.permission({ permissions: ['risks:create'] }));
            router.put('/:id/evidence/:evidenceId', [Iso27001ControlsController, 'updateEvidence'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.delete('/:id/evidence/:evidenceId', [Iso27001ControlsController, 'deleteEvidence'])
                .use(middleware.permission({ permissions: ['risks:delete'] }));
        }).prefix('/iso27001/controls');
        router.group(() => {
            router.get('/', [InventoryController, 'index'])
                .use(middleware.permission({ permissions: ['risks:view'] }));
            router.post('/', [InventoryController, 'store'])
                .use(middleware.permission({ permissions: ['risks:create'] }));
            router.put('/:id', [InventoryController, 'update'])
                .use(middleware.permission({ permissions: ['risks:edit'] }));
            router.delete('/:id', [InventoryController, 'destroy'])
                .use(middleware.permission({ permissions: ['risks:delete'] }));
        }).prefix('/inventory');
        router.group(() => {
            router.get('/dashboard', [ReportsController, 'dashboard'])
                .use(middleware.permission({ permissions: ['reports:view'] }));
            router.get('/gap-assessment/export', [ReportsController, 'exportGapAssessment'])
                .use(middleware.permission({ permissions: ['reports:export'] }));
            router.get('/risk-register/export', [ReportsController, 'exportRiskRegister'])
                .use(middleware.permission({ permissions: ['reports:export'] }));
            router.get('/soa/export', [ReportsController, 'exportSoa'])
                .use(middleware.permission({ permissions: ['reports:export'] }));
            router.get('/audit-readiness/export', [ReportsController, 'exportAuditReadiness'])
                .use(middleware.permission({ permissions: ['reports:export'] }));
            router.get('/evidence/export', [ReportsController, 'exportEvidence'])
                .use(middleware.permission({ permissions: ['reports:export'] }));
            router.get('/management/export', [ReportsController, 'exportManagement'])
                .use(middleware.permission({ permissions: ['reports:export'] }));
            router.get('/corrective/export', [ReportsController, 'exportCorrective'])
                .use(middleware.permission({ permissions: ['reports:export'] }));
        }).prefix('/reports');
    }).use(middleware.auth()).use(middleware.tenant());
}).prefix('/api/v1');
//# sourceMappingURL=routes.js.map