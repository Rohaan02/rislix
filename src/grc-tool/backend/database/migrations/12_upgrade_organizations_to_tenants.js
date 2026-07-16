import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        this.schema.renameTable('organizations', 'tenants');
        this.schema.alterTable('tenants', (table) => {
            table.string('country', 100).nullable().after('industry');
            table
                .enum('status', ['active', 'paused', 'completed'])
                .defaultTo('active')
                .notNullable()
                .after('country');
            table
                .enum('subscription_plan', ['trial', 'starter', 'professional', 'enterprise'])
                .defaultTo('trial')
                .notNullable()
                .after('status');
        });
        this.schema.alterTable('tenants', (table) => {
            table.dropColumn('is_active');
        });
    }
    async down() {
        this.schema.alterTable('tenants', (table) => {
            table.boolean('is_active').defaultTo(true).notNullable();
            table.dropColumn('subscription_plan');
            table.dropColumn('status');
            table.dropColumn('country');
        });
        this.schema.renameTable('tenants', 'organizations');
    }
}
//# sourceMappingURL=12_upgrade_organizations_to_tenants.js.map