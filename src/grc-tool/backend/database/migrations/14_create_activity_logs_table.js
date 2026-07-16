import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'activity_logs';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable();
            table
                .integer('tenant_id')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('tenants')
                .onDelete('CASCADE');
            table
                .integer('user_id')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL');
            table.string('action', 50).notNullable();
            table.string('entity_type', 100).notNullable();
            table.integer('entity_id').unsigned().nullable();
            table.json('metadata').nullable();
            table.string('ip_address', 45).nullable();
            table.timestamp('created_at').notNullable();
            table.index(['tenant_id', 'created_at']);
            table.index(['entity_type', 'entity_id']);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=14_create_activity_logs_table.js.map