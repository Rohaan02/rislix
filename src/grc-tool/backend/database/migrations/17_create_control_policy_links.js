import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'control_policy_links';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('tenant_control_id').unsigned().notNullable()
                .references('id').inTable('tenant_controls').onDelete('CASCADE');
            table.integer('policy_id').unsigned().notNullable()
                .references('id').inTable('policies').onDelete('CASCADE');
            table.unique(['tenant_control_id', 'policy_id']);
            table.timestamps(true, true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=17_create_control_policy_links.js.map