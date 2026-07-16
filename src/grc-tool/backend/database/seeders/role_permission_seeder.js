import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Permission from '#models/permission';
import Role from '#models/role';
const PERMISSIONS = [
    { name: 'users:view', displayName: 'View Users', group: 'users' },
    { name: 'users:create', displayName: 'Create Users', group: 'users' },
    { name: 'users:edit', displayName: 'Edit Users', group: 'users' },
    { name: 'users:delete', displayName: 'Delete Users', group: 'users' },
    { name: 'roles:view', displayName: 'View Roles', group: 'roles' },
    { name: 'roles:manage', displayName: 'Manage Roles', group: 'roles' },
    { name: 'tenants:manage', displayName: 'Manage Tenants', group: 'tenants' },
    { name: 'activity_logs:view', displayName: 'View Activity Logs', group: 'activity_logs' },
    { name: 'risks:view', displayName: 'View Risks', group: 'risks' },
    { name: 'risks:create', displayName: 'Create Risks', group: 'risks' },
    { name: 'risks:edit', displayName: 'Edit Risks', group: 'risks' },
    { name: 'risks:delete', displayName: 'Delete Risks', group: 'risks' },
    { name: 'controls:view', displayName: 'View Controls', group: 'controls' },
    { name: 'controls:create', displayName: 'Create Controls', group: 'controls' },
    { name: 'controls:edit', displayName: 'Edit Controls', group: 'controls' },
    { name: 'controls:delete', displayName: 'Delete Controls', group: 'controls' },
    { name: 'assessments:view', displayName: 'View Assessments', group: 'assessments' },
    { name: 'assessments:create', displayName: 'Create Assessments', group: 'assessments' },
    { name: 'assessments:edit', displayName: 'Edit Assessments', group: 'assessments' },
    { name: 'assessments:delete', displayName: 'Delete Assessments', group: 'assessments' },
    { name: 'evidence:view', displayName: 'View Evidence', group: 'evidence' },
    { name: 'evidence:create', displayName: 'Create Evidence', group: 'evidence' },
    { name: 'evidence:edit', displayName: 'Edit Evidence', group: 'evidence' },
    { name: 'evidence:delete', displayName: 'Delete Evidence', group: 'evidence' },
    { name: 'evidence:approve', displayName: 'Approve Evidence', group: 'evidence' },
    { name: 'policies:view', displayName: 'View Policies', group: 'policies' },
    { name: 'policies:create', displayName: 'Create Policies', group: 'policies' },
    { name: 'policies:edit', displayName: 'Edit Policies', group: 'policies' },
    { name: 'policies:delete', displayName: 'Delete Policies', group: 'policies' },
    { name: 'audits:view', displayName: 'View Audits', group: 'audits' },
    { name: 'audits:create', displayName: 'Create Audits', group: 'audits' },
    { name: 'audits:edit', displayName: 'Edit Audits', group: 'audits' },
    { name: 'audits:delete', displayName: 'Delete Audits', group: 'audits' },
    { name: 'tasks:view', displayName: 'View Tasks', group: 'tasks' },
    { name: 'tasks:create', displayName: 'Create Tasks', group: 'tasks' },
    { name: 'tasks:edit', displayName: 'Edit Tasks', group: 'tasks' },
    { name: 'tasks:delete', displayName: 'Delete Tasks', group: 'tasks' },
    { name: 'reports:view', displayName: 'View Reports', group: 'reports' },
    { name: 'reports:export', displayName: 'Export Reports', group: 'reports' },
];
const ALL_PERMS = PERMISSIONS.map((p) => p.name);
const ROLES = [
    {
        name: 'super_admin',
        displayName: 'Super Admin',
        description: 'Platform-wide access across all tenants.',
        isSystem: true,
        permissions: ALL_PERMS,
    },
    {
        name: 'consultant_admin',
        displayName: 'Consultant Admin',
        description: 'Manages multiple client tenants and frameworks.',
        isSystem: true,
        permissions: [
            'tenants:manage', 'users:view', 'users:create', 'users:edit',
            'activity_logs:view', 'controls:view', 'controls:create', 'controls:edit',
            'assessments:view', 'reports:view', 'reports:export',
        ],
    },
    {
        name: 'client_admin',
        displayName: 'Client Admin',
        description: 'Full access within a single tenant.',
        isSystem: true,
        permissions: ALL_PERMS.filter((p) => p !== 'tenants:manage'),
    },
    {
        name: 'admin',
        displayName: 'Administrator',
        description: 'Full access to all features (legacy alias).',
        isSystem: true,
        permissions: ALL_PERMS.filter((p) => p !== 'tenants:manage'),
    },
    {
        name: 'compliance_manager',
        displayName: 'Compliance Manager',
        description: 'Manages controls, assessments, evidence, and policies.',
        isSystem: true,
        permissions: [
            'users:view', 'activity_logs:view',
            'controls:view', 'controls:create', 'controls:edit',
            'assessments:view', 'assessments:create', 'assessments:edit',
            'evidence:view', 'evidence:create', 'evidence:edit', 'evidence:approve',
            'policies:view', 'policies:create', 'policies:edit',
            'reports:view', 'reports:export',
        ],
    },
    {
        name: 'grc_manager',
        displayName: 'GRC Manager',
        description: 'Manages risks, controls, and assessments.',
        isSystem: true,
        permissions: [
            'users:view', 'roles:view', 'activity_logs:view',
            'risks:view', 'risks:create', 'risks:edit', 'risks:delete',
            'controls:view', 'controls:create', 'controls:edit', 'controls:delete',
            'assessments:view', 'assessments:create', 'assessments:edit', 'assessments:delete',
            'evidence:view', 'evidence:create', 'evidence:edit',
            'policies:view', 'policies:create', 'policies:edit',
            'audits:view', 'tasks:view', 'tasks:create', 'tasks:edit',
            'reports:view', 'reports:export',
        ],
    },
    {
        name: 'risk_manager',
        displayName: 'Risk Manager',
        description: 'Owns risk register and treatments.',
        isSystem: true,
        permissions: [
            'risks:view', 'risks:create', 'risks:edit', 'risks:delete',
            'controls:view', 'tasks:view', 'tasks:create', 'tasks:edit',
            'reports:view',
        ],
    },
    {
        name: 'control_owner',
        displayName: 'Control Owner',
        description: 'Updates assigned controls and evidence.',
        isSystem: true,
        permissions: [
            'controls:view', 'controls:edit',
            'evidence:view', 'evidence:create', 'evidence:edit',
            'tasks:view', 'tasks:edit',
        ],
    },
    {
        name: 'evidence_owner',
        displayName: 'Evidence Owner',
        description: 'Uploads and maintains evidence.',
        isSystem: true,
        permissions: [
            'evidence:view', 'evidence:create', 'evidence:edit',
            'controls:view',
        ],
    },
    {
        name: 'analyst',
        displayName: 'Analyst',
        description: 'Creates and edits risks and controls.',
        isSystem: true,
        permissions: [
            'risks:view', 'risks:create', 'risks:edit',
            'controls:view', 'controls:create', 'controls:edit',
            'assessments:view', 'evidence:view',
            'reports:view',
        ],
    },
    {
        name: 'auditor',
        displayName: 'Auditor',
        description: 'Read-only plus audit and export rights.',
        isSystem: true,
        permissions: [
            'users:view', 'activity_logs:view',
            'risks:view', 'controls:view', 'assessments:view',
            'evidence:view', 'policies:view',
            'audits:view', 'audits:edit',
            'reports:view', 'reports:export',
        ],
    },
    {
        name: 'external_auditor',
        displayName: 'External Auditor',
        description: 'Scoped read-only audit access.',
        isSystem: true,
        permissions: [
            'controls:view', 'evidence:view', 'audits:view', 'audits:edit',
            'reports:view', 'reports:export',
        ],
    },
    {
        name: 'executive_viewer',
        displayName: 'Executive Viewer',
        description: 'Dashboard and reports read-only.',
        isSystem: true,
        permissions: [
            'risks:view', 'controls:view', 'assessments:view',
            'evidence:view', 'policies:view', 'audits:view', 'tasks:view',
            'reports:view',
        ],
    },
    {
        name: 'viewer',
        displayName: 'Viewer',
        description: 'Read-only access to core modules.',
        isSystem: true,
        permissions: [
            'risks:view', 'controls:view', 'assessments:view',
            'evidence:view', 'policies:view', 'reports:view',
        ],
    },
];
export default class RolePermissionSeeder extends BaseSeeder {
    async run() {
        for (const perm of PERMISSIONS) {
            await Permission.updateOrCreate({ name: perm.name }, perm);
        }
        for (const roleDef of ROLES) {
            const { permissions: permNames, ...roleData } = roleDef;
            const role = await Role.updateOrCreate({ name: roleData.name }, roleData);
            const permIds = await Permission.query().whereIn('name', permNames).select('id');
            await role.related('permissions').sync(permIds.map((p) => p.id));
        }
        console.log('✅  Roles & permissions seeded.');
    }
}
//# sourceMappingURL=role_permission_seeder.js.map