import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'users';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('organization_id')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('organizations')
                .onDelete('SET NULL')
                .after('role_id');
            table
                .enum('status', ['active', 'inactive', 'invited'])
                .defaultTo('active')
                .notNullable()
                .after('organization_id');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('organization_id');
            table.dropColumn('status');
        });
    }
}
//# sourceMappingURL=8_add_org_and_status_to_users.js.map