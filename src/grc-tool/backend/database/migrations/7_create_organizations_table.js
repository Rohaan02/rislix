import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'organizations';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable();
            table.string('name', 150).notNullable();
            table.string('slug', 100).notNullable().unique();
            table.string('industry', 100).nullable();
            table.string('website', 255).nullable();
            table.boolean('is_active').defaultTo(true).notNullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=7_create_organizations_table.js.map