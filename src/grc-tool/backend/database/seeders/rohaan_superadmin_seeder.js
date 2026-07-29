import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '#models/user';
import Role from '#models/role';
export default class RohaanSuperAdminSeeder extends BaseSeeder {
    async run() {
        const superAdminRole = await Role.findBy('name', 'super_admin');
        if (!superAdminRole) {
            console.log('⚠️  Run role_permission_seeder first. Skipping.');
            return;
        }
        await User.updateOrCreate({ email: 'rohaannadeem2@gmail.com' }, {
            fullName: 'Rohaan Nadeem',
            email: 'rohaannadeem2@gmail.com',
            password: 'SuperAdmin@12345',
            roleId: superAdminRole.id,
            tenantId: null,
            status: 'active',
        });
        console.log('✅  rohaannadeem2@gmail.com created/updated as super_admin');
        console.log('    Password: SuperAdmin@12345');
    }
}
//# sourceMappingURL=rohaan_superadmin_seeder.js.map