import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        this.schema.createTable('iso27001_controls', (table) => {
            table.increments('id');
            table.string('control_number', 20).notNullable();
            table.enum('category', ['organizational', 'people', 'physical', 'technological']).notNullable();
            table.string('title', 500).notNullable();
            table.text('description').nullable();
            table.integer('sort_order').unsigned().defaultTo(0);
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable('iso27001_controls');
    }
}
//# sourceMappingURL=23_create_iso27001_controls.js.map