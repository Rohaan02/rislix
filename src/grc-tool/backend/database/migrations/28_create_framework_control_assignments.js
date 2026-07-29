import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        const hasTable = await this.schema.hasTable('framework_control_assignments');
        if (hasTable)
            return;
        this.schema.createTable('framework_control_assignments', (table) => {
            table.increments('id');
            table.integer('control_id').unsigned().notNullable().references('id').inTable('controls').onDelete('CASCADE');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('department', 255).notNullable();
            table.integer('assigned_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTableIfExists('framework_control_assignments');
    }
}
//# sourceMappingURL=28_create_framework_control_assignments.js.map