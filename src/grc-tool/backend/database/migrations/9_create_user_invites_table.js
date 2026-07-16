import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'user_invites';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable();
            table.string('email', 254).notNullable();
            table.string('token', 64).notNullable().unique();
            table
                .integer('organization_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('organizations')
                .onDelete('CASCADE');
            table
                .integer('role_id')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('roles')
                .onDelete('SET NULL');
            table
                .integer('invited_by')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL');
            table.boolean('is_accepted').defaultTo(false).notNullable();
            table.timestamp('expires_at').notNullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=9_create_user_invites_table.js.map