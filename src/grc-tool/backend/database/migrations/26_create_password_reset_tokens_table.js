import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'password_reset_tokens';
    async up() {
        const exists = await this.schema.hasTable(this.tableName);
        if (exists)
            return;
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable();
            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
            table.string('token', 64).notNullable().unique();
            table.timestamp('expires_at').notNullable();
            table.timestamp('created_at').notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=26_create_password_reset_tokens_table.js.map