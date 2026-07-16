import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        this.schema.alterTable('users', (table) => {
            table.renameColumn('organization_id', 'tenant_id');
        });
        this.schema.alterTable('user_invites', (table) => {
            table.renameColumn('organization_id', 'tenant_id');
        });
        this.schema.alterTable('risks', (table) => {
            table.renameColumn('organization_id', 'tenant_id');
        });
    }
    async down() {
        this.schema.alterTable('risks', (table) => {
            table.renameColumn('tenant_id', 'organization_id');
        });
        this.schema.alterTable('user_invites', (table) => {
            table.renameColumn('tenant_id', 'organization_id');
        });
        this.schema.alterTable('users', (table) => {
            table.renameColumn('tenant_id', 'organization_id');
        });
    }
}
//# sourceMappingURL=13_rename_org_columns_to_tenant.js.map