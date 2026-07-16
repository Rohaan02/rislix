import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'users';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('role_id')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('roles')
                .onDelete('SET NULL')
                .after('password');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('role_id');
        });
    }
}
//# sourceMappingURL=6_add_role_id_to_users.js.map