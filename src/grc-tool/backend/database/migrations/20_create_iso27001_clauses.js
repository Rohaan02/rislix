import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        this.schema.createTable('iso27001_clauses', (table) => {
            table.increments('id');
            table.integer('parent_id').unsigned().nullable().references('id').inTable('iso27001_clauses').onDelete('CASCADE');
            table.string('clause_number', 20).notNullable();
            table.string('title', 500).notNullable();
            table.text('description').nullable();
            table.integer('sort_order').unsigned().defaultTo(0);
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable('iso27001_clauses');
    }
}
//# sourceMappingURL=20_create_iso27001_clauses.js.map