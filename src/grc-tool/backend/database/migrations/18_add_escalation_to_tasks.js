import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'tasks';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('escalated_to').unsigned().nullable()
                .references('id').inTable('users').onDelete('SET NULL');
            table.timestamp('escalated_at').nullable();
            table.text('escalation_note').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('escalated_to');
            table.dropColumn('escalated_at');
            table.dropColumn('escalation_note');
        });
    }
}
//# sourceMappingURL=18_add_escalation_to_tasks.js.map