import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        this.schema.createTable('iso27001_clause_assignments', (table) => {
            table.increments('id');
            table.integer('clause_id').unsigned().notNullable().references('id').inTable('iso27001_clauses').onDelete('CASCADE');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('department', 255).notNullable();
            table.integer('assigned_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable('iso27001_clause_assignments');
    }
}
//# sourceMappingURL=22_create_iso27001_clause_assignments.js.map