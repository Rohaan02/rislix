import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'password_reset_tokens';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('token');
            table.string('otp', 6).notNullable().defaultTo('000000').after('user_id');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('otp');
            table.string('token', 64).unique().notNullable().defaultTo('').after('user_id');
        });
    }
}
//# sourceMappingURL=29_alter_password_reset_tokens_to_otp.js.map