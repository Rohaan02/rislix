import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        this.schema.createTable('opportunities', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('opportunity_code', 50).nullable();
            table.string('title', 500).notNullable();
            table.text('description').nullable();
            table.string('source_or_trigger', 500).nullable();
            table.string('affected_area', 500).nullable();
            table.string('opportunity_type', 100).nullable();
            table.text('potential_benefit').nullable();
            table.enum('likelihood', ['low', 'medium', 'high']).defaultTo('medium');
            table.enum('impact', ['low', 'medium', 'high']).defaultTo('medium');
            table.enum('priority', ['low', 'medium', 'high']).defaultTo('medium');
            table.text('actions_required').nullable();
            table.integer('owner_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.date('target_date').nullable();
            table.enum('status', ['open', 'in_progress', 'closed', 'planned']).defaultTo('open');
            table.integer('created_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable('opportunities');
    }
}
//# sourceMappingURL=19_create_opportunities.js.map