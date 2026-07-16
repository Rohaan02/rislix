import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        this.schema.createTable('inventory_items', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.enum('category', ['people', 'process', 'technology']).notNullable();
            table.string('asset_group', 200).notNullable();
            table.string('information_asset', 300).notNullable();
            table.string('asset_owner', 100).notNullable();
            table.string('classification', 50).notNullable();
            table.integer('confidentiality').unsigned().notNullable();
            table.integer('integrity').unsigned().notNullable();
            table.integer('availability').unsigned().notNullable();
            table.integer('asset_score').unsigned().notNullable();
            table.enum('asset_value', ['high', 'medium', 'low']).notNullable();
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable('inventory_items');
    }
}
//# sourceMappingURL=25_create_inventory_items.js.map