import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'risk_history';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable();
            table
                .integer('risk_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('risks')
                .onDelete('CASCADE');
            table.tinyint('likelihood').unsigned().notNullable();
            table.tinyint('impact').unsigned().notNullable();
            table.tinyint('risk_score').unsigned().notNullable();
            table.string('risk_tier', 20).notNullable();
            table.string('status', 30).notNullable();
            table
                .integer('changed_by')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL');
            table.timestamp('created_at').notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=11_create_risk_history_table.js.map