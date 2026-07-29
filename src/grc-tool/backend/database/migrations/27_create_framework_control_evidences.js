import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        const hasTable = await this.schema.hasTable('framework_control_evidences');
        if (hasTable)
            return;
        this.schema.createTable('framework_control_evidences', (table) => {
            table.increments('id');
            table.integer('control_id').unsigned().notNullable().references('id').inTable('controls').onDelete('CASCADE');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('file_name', 500).notNullable();
            table.string('file_path', 1000).notNullable();
            table.string('file_type', 100).nullable();
            table.enum('status', ['ready', 'not_ready', 'in_progress', 'not_applicable', 'needs_review']).defaultTo('in_progress');
            table.text('notes').nullable();
            table.integer('uploaded_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTableIfExists('framework_control_evidences');
    }
}
//# sourceMappingURL=27_create_framework_control_evidences.js.map