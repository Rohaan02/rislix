import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'risks';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable();
            table
                .integer('organization_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('organizations')
                .onDelete('CASCADE');
            table.string('title', 200).notNullable();
            table.text('description').nullable();
            table
                .enum('category', [
                'strategic',
                'operational',
                'financial',
                'compliance',
                'reputational',
                'technical',
                'physical',
                'other',
            ])
                .notNullable()
                .defaultTo('other');
            table.tinyint('likelihood').unsigned().notNullable().defaultTo(1);
            table.tinyint('impact').unsigned().notNullable().defaultTo(1);
            table.tinyint('risk_score').unsigned().notNullable().defaultTo(1);
            table
                .enum('risk_tier', ['low', 'medium', 'high', 'critical'])
                .notNullable()
                .defaultTo('low');
            table
                .enum('status', ['open', 'in_treatment', 'accepted', 'closed'])
                .notNullable()
                .defaultTo('open');
            table.text('treatment').nullable();
            table
                .integer('owner_id')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL');
            table
                .integer('created_by')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL');
            table.date('review_date').nullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=10_create_risks_table.js.map