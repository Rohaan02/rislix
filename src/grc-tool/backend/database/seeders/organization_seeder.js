import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Tenant from '#models/tenant';
import User from '#models/user';
import Role from '#models/role';
export default class OrganizationSeeder extends BaseSeeder {
    async run() {
        const tenant = await Tenant.updateOrCreate({ slug: 'rislix-demo' }, {
            name: 'Rislix Demo Org',
            slug: 'rislix-demo',
            industry: 'Technology',
            website: 'https://rislix.io',
            status: 'active',
            subscriptionPlan: 'professional',
        });
        const adminRole = await Role.findBy('name', 'admin');
        if (adminRole) {
            await User.updateOrCreate({ email: 'admin@rislix.io' }, {
                fullName: 'Rislix Admin',
                email: 'admin@rislix.io',
                password: 'Admin@12345',
                roleId: adminRole.id,
                tenantId: tenant.id,
                status: 'active',
            });
            console.log('✅  Default tenant + admin user seeded.');
            console.log('    Email:    admin@rislix.io');
            console.log('    Password: Admin@12345');
        }
    }
}
//# sourceMappingURL=organization_seeder.js.map