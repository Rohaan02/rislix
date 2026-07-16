import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'tenant_controls';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('test_result', 50).nullable();
            table.text('test_notes').nullable();
            table.integer('tested_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamp('tested_at').nullable();
            table.timestamp('next_test_date').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('test_result');
            table.dropColumn('test_notes');
            table.dropColumn('tested_by');
            table.dropColumn('tested_at');
            table.dropColumn('next_test_date');
        });
    }
}
//# sourceMappingURL=16_add_control_testing_fields.js.map