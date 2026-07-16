import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Tenant from '#models/tenant';
import User from '#models/user';
import Role from '#models/role';
import Department from '#models/department';
const SUPER_ADMINS = [
    { fullName: 'Waleed', email: 'waleed@rislix.io' },
    { fullName: 'Rohaan', email: 'rohaan@rislix.io' },
    { fullName: 'Super Admin', email: 'superadmin@rislix.io' },
];
const ORGANIZATIONS = [
    {
        name: 'TechCorp Solutions',
        slug: 'techcorp-solutions',
        industry: 'Technology',
        country: 'United States',
        website: 'https://techcorp.io',
        subscriptionPlan: 'enterprise',
        users: [
            { fullName: 'TC Admin', email: 'admin@techcorp.io', role: 'client_admin', dept: null },
            { fullName: 'TC Manager', email: 'manager@techcorp.io', role: 'grc_manager', dept: null },
            { fullName: 'TC IT Lead', email: 'it@techcorp.io', role: 'control_owner', dept: 'IT' },
            { fullName: 'TC HR Lead', email: 'hr@techcorp.io', role: 'evidence_owner', dept: 'HR' },
            { fullName: 'TC Employee', email: 'employee@techcorp.io', role: 'viewer', dept: null },
            { fullName: 'TC Auditor', email: 'auditor@techcorp.io', role: 'auditor', dept: null },
        ],
    },
    {
        name: 'FinSecure Bank',
        slug: 'finsecure-bank',
        industry: 'Finance',
        country: 'United Kingdom',
        website: 'https://finsecure.io',
        subscriptionPlan: 'professional',
        users: [
            { fullName: 'FS Admin', email: 'admin@finsecure.io', role: 'client_admin', dept: null },
            { fullName: 'FS Manager', email: 'manager@finsecure.io', role: 'grc_manager', dept: null },
            { fullName: 'FS IT Lead', email: 'it@finsecure.io', role: 'control_owner', dept: 'IT' },
            { fullName: 'FS HR Lead', email: 'hr@finsecure.io', role: 'evidence_owner', dept: 'HR' },
            { fullName: 'FS Employee', email: 'employee@finsecure.io', role: 'viewer', dept: null },
            { fullName: 'FS Auditor', email: 'auditor@finsecure.io', role: 'auditor', dept: null },
        ],
    },
    {
        name: 'MedGuard Health',
        slug: 'medguard-health',
        industry: 'Healthcare',
        country: 'Canada',
        website: 'https://medguard.io',
        subscriptionPlan: 'professional',
        users: [
            { fullName: 'MG Admin', email: 'admin@medguard.io', role: 'client_admin', dept: null },
            { fullName: 'MG Manager', email: 'manager@medguard.io', role: 'grc_manager', dept: null },
            { fullName: 'MG IT Lead', email: 'it@medguard.io', role: 'control_owner', dept: 'IT' },
            { fullName: 'MG HR Lead', email: 'hr@medguard.io', role: 'evidence_owner', dept: 'HR' },
            { fullName: 'MG Employee', email: 'employee@medguard.io', role: 'viewer', dept: null },
            { fullName: 'MG Auditor', email: 'auditor@medguard.io', role: 'auditor', dept: null },
        ],
    },
];
export default class MultiTenantSeeder extends BaseSeeder {
    async run() {
        const superAdminRole = await Role.findBy('name', 'super_admin');
        if (!superAdminRole) {
            console.log('⚠️  Run role_permission_seeder before multi_tenant_seeder. Skipping.');
            return;
        }
        for (const sa of SUPER_ADMINS) {
            await User.updateOrCreate({ email: sa.email }, {
                fullName: sa.fullName,
                email: sa.email,
                password: 'SuperAdmin@12345',
                roleId: superAdminRole.id,
                tenantId: null,
                status: 'active',
            });
        }
        const roleNames = ['client_admin', 'grc_manager', 'control_owner', 'evidence_owner', 'viewer', 'auditor'];
        const roleMap = {};
        for (const name of roleNames) {
            const role = await Role.findBy('name', name);
            if (role)
                roleMap[name] = role.id;
        }
        for (const orgDef of ORGANIZATIONS) {
            const { users, ...tenantFields } = orgDef;
            const tenant = await Tenant.updateOrCreate({ slug: tenantFields.slug }, { ...tenantFields, status: 'active' });
            const deptMap = {};
            for (const deptName of ['IT', 'HR']) {
                const dept = await Department.firstOrCreate({ tenantId: tenant.id, name: deptName }, { tenantId: tenant.id, name: deptName, parentId: null });
                deptMap[deptName] = dept.id;
            }
            for (const u of users) {
                const isOrgAdmin = u.role === 'client_admin';
                await User.updateOrCreate({ email: u.email }, {
                    fullName: u.fullName,
                    email: u.email,
                    password: isOrgAdmin ? 'Admin@12345' : 'Demo@12345',
                    roleId: roleMap[u.role] ?? null,
                    tenantId: tenant.id,
                    departmentId: u.dept ? (deptMap[u.dept] ?? null) : null,
                    status: 'active',
                });
            }
        }
        console.log('');
        console.log('────────────────────────────────────────────────────────────────');
        console.log('✅  Multi-tenant seeder complete');
        console.log('');
        console.log('SUPER ADMINS  (platform-wide)           password: SuperAdmin@12345');
        for (const sa of SUPER_ADMINS) {
            console.log(`    ${sa.email}`);
        }
        console.log('');
        for (const org of ORGANIZATIONS) {
            console.log(`${org.name}`);
            for (const u of org.users) {
                const pw = u.role === 'client_admin' ? 'Admin@12345' : 'Demo@12345';
                console.log(`    ${u.role.padEnd(16)} ${u.email.padEnd(32)} password: ${pw}`);
            }
            console.log('');
        }
        console.log('────────────────────────────────────────────────────────────────');
    }
}
//# sourceMappingURL=multi_tenant_seeder.js.map