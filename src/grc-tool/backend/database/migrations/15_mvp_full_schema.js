import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        this.schema.alterTable('users', (table) => {
            table.timestamp('last_login').nullable();
            table.boolean('mfa_enabled').defaultTo(false).notNullable();
            table.string('mfa_secret', 255).nullable();
            table.integer('department_id').unsigned().nullable();
            table.integer('updated_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
        });
        this.schema.alterTable('tenants', (table) => {
            table.integer('updated_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
        });
        this.schema.createTable('departments', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('name', 150).notNullable();
            table.integer('parent_id').unsigned().nullable();
            table.timestamps(true, true);
        });
        this.schema.createTable('locations', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('name', 150).notNullable();
            table.string('address', 500).nullable();
            table.string('country', 100).nullable();
            table.timestamps(true, true);
        });
        this.schema.createTable('business_units', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('name', 150).notNullable();
            table.timestamps(true, true);
        });
        this.schema.alterTable('users', (table) => {
            table.foreign('department_id').references('id').inTable('departments').onDelete('SET NULL');
        });
        this.schema.createTable('frameworks', (table) => {
            table.increments('id');
            table.string('name', 200).notNullable();
            table.string('version', 50).nullable();
            table.text('description').nullable();
            table.enum('status', ['active', 'draft', 'archived']).defaultTo('active');
            table.timestamps(true, true);
        });
        this.schema.createTable('tenant_frameworks', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.integer('framework_id').unsigned().notNullable().references('id').inTable('frameworks').onDelete('CASCADE');
            table.timestamp('enabled_at').notNullable();
            table.unique(['tenant_id', 'framework_id']);
        });
        this.schema.createTable('controls', (table) => {
            table.increments('id');
            table.integer('framework_id').unsigned().notNullable().references('id').inTable('frameworks').onDelete('CASCADE');
            table.string('control_code', 50).notNullable();
            table.string('control_title', 300).notNullable();
            table.text('control_description').nullable();
            table.string('domain', 150).nullable();
            table.text('evidence_required').nullable();
            table.enum('control_type', ['preventive', 'detective', 'corrective']).nullable();
            table.timestamps(true, true);
            table.unique(['framework_id', 'control_code']);
        });
        this.schema.createTable('control_mappings', (table) => {
            table.increments('id');
            table.integer('source_control_id').unsigned().notNullable().references('id').inTable('controls').onDelete('CASCADE');
            table.integer('target_control_id').unsigned().notNullable().references('id').inTable('controls').onDelete('CASCADE');
            table.string('mapping_type', 50).defaultTo('equivalent');
        });
        this.schema.createTable('tenant_controls', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.integer('control_id').unsigned().notNullable().references('id').inTable('controls').onDelete('CASCADE');
            table.enum('status', [
                'not_started', 'not_applicable', 'partially_implemented', 'implemented',
                'needs_review', 'compliant', 'non_compliant',
            ]).defaultTo('not_started');
            table.integer('owner_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.boolean('applicability').defaultTo(true);
            table.text('comments').nullable();
            table.date('due_date').nullable();
            table.integer('created_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.integer('updated_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamps(true, true);
            table.unique(['tenant_id', 'control_id']);
        });
        this.schema.createTable('assessments', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.integer('framework_id').unsigned().notNullable().references('id').inTable('frameworks').onDelete('CASCADE');
            table.string('name', 200).notNullable();
            table.enum('status', ['draft', 'in_progress', 'submitted', 'approved', 'rejected']).defaultTo('draft');
            table.timestamp('started_at').nullable();
            table.timestamp('completed_at').nullable();
            table.integer('created_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamps(true, true);
        });
        this.schema.createTable('assessment_responses', (table) => {
            table.increments('id');
            table.integer('assessment_id').unsigned().notNullable().references('id').inTable('assessments').onDelete('CASCADE');
            table.integer('tenant_control_id').unsigned().notNullable().references('id').inTable('tenant_controls').onDelete('CASCADE');
            table.enum('status', [
                'not_started', 'not_applicable', 'partially_implemented', 'implemented',
                'needs_review', 'compliant', 'non_compliant',
            ]).defaultTo('not_started');
            table.tinyint('score').unsigned().nullable();
            table.text('comments').nullable();
            table.integer('owner_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.date('due_date').nullable();
            table.integer('evidence_id').unsigned().nullable();
            table.timestamps(true, true);
        });
        this.schema.alterTable('risks', (table) => {
            table.string('risk_code', 50).nullable();
            table.string('asset_or_process', 300).nullable();
            table.tinyint('inherent_likelihood').unsigned().nullable();
            table.tinyint('inherent_impact').unsigned().nullable();
            table.tinyint('inherent_score').unsigned().nullable();
            table.tinyint('residual_likelihood').unsigned().nullable();
            table.tinyint('residual_impact').unsigned().nullable();
            table.tinyint('residual_score').unsigned().nullable();
            table.enum('treatment_option', ['mitigate', 'transfer', 'accept', 'avoid']).nullable();
            table.date('target_date').nullable();
            table.enum('approval_status', ['pending', 'approved', 'rejected']).defaultTo('pending');
            table.integer('approved_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamp('approved_at').nullable();
            table.integer('updated_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
        });
        this.schema.createTable('risk_controls', (table) => {
            table.increments('id');
            table.integer('risk_id').unsigned().notNullable().references('id').inTable('risks').onDelete('CASCADE');
            table.integer('tenant_control_id').unsigned().notNullable().references('id').inTable('tenant_controls').onDelete('CASCADE');
            table.unique(['risk_id', 'tenant_control_id']);
        });
        this.schema.createTable('risk_treatments', (table) => {
            table.increments('id');
            table.integer('risk_id').unsigned().notNullable().references('id').inTable('risks').onDelete('CASCADE');
            table.enum('treatment_option', ['mitigate', 'transfer', 'accept', 'avoid']).notNullable();
            table.text('plan').nullable();
            table.integer('created_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamp('created_at').notNullable();
        });
        this.schema.createTable('evidence', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('title', 300).notNullable();
            table.text('description').nullable();
            table.string('file_url', 500).nullable();
            table.enum('evidence_type', [
                'policy', 'screenshot', 'report', 'meeting_minutes', 'audit_log',
                'config_export', 'ticket', 'certificate', 'training_record', 'risk_assessment',
            ]).notNullable();
            table.integer('owner_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.enum('status', ['pending', 'approved', 'rejected', 'expired']).defaultTo('pending');
            table.date('expiry_date').nullable();
            table.date('review_date').nullable();
            table.integer('version').unsigned().defaultTo(1);
            table.integer('uploaded_by').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.text('auditor_comments').nullable();
            table.integer('created_by').unsigned().nullable();
            table.integer('updated_by').unsigned().nullable();
            table.timestamps(true, true);
        });
        this.schema.createTable('evidence_versions', (table) => {
            table.increments('id');
            table.integer('evidence_id').unsigned().notNullable().references('id').inTable('evidence').onDelete('CASCADE');
            table.integer('version_number').unsigned().notNullable();
            table.string('file_url', 500).nullable();
            table.integer('uploaded_by').unsigned().nullable();
            table.timestamp('created_at').notNullable();
        });
        this.schema.createTable('evidence_control_links', (table) => {
            table.increments('id');
            table.integer('evidence_id').unsigned().notNullable().references('id').inTable('evidence').onDelete('CASCADE');
            table.integer('tenant_control_id').unsigned().notNullable().references('id').inTable('tenant_controls').onDelete('CASCADE');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.unique(['evidence_id', 'tenant_control_id']);
        });
        this.schema.alterTable('assessment_responses', (table) => {
            table.foreign('evidence_id').references('id').inTable('evidence').onDelete('SET NULL');
        });
        this.schema.createTable('policies', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('title', 300).notNullable();
            table.string('document_type', 100).nullable();
            table.integer('owner_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.enum('status', ['draft', 'under_review', 'approved', 'expired']).defaultTo('draft');
            table.string('review_frequency', 50).nullable();
            table.date('next_review_date').nullable();
            table.boolean('is_template').defaultTo(false);
            table.timestamps(true, true);
        });
        this.schema.createTable('policy_versions', (table) => {
            table.increments('id');
            table.integer('policy_id').unsigned().notNullable().references('id').inTable('policies').onDelete('CASCADE');
            table.integer('version_number').unsigned().notNullable();
            table.string('file_url', 500).nullable();
            table.enum('status', ['draft', 'under_review', 'approved', 'expired']).defaultTo('draft');
            table.integer('approved_by').unsigned().nullable();
            table.timestamp('approved_at').nullable();
            table.timestamp('created_at').notNullable();
        });
        this.schema.createTable('policy_acknowledgments', (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
            table.integer('policy_version_id').unsigned().notNullable().references('id').inTable('policy_versions').onDelete('CASCADE');
            table.timestamp('acknowledged_at').notNullable();
            table.unique(['user_id', 'policy_version_id']);
        });
        this.schema.createTable('audits', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('audit_title', 300).notNullable();
            table.string('audit_type', 100).nullable();
            table.integer('framework_id').unsigned().nullable().references('id').inTable('frameworks').onDelete('SET NULL');
            table.text('scope').nullable();
            table.date('start_date').nullable();
            table.date('end_date').nullable();
            table.integer('auditor_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.enum('status', ['planned', 'in_progress', 'completed', 'cancelled']).defaultTo('planned');
            table.timestamps(true, true);
        });
        this.schema.createTable('audit_checklist_items', (table) => {
            table.increments('id');
            table.integer('audit_id').unsigned().notNullable().references('id').inTable('audits').onDelete('CASCADE');
            table.integer('tenant_control_id').unsigned().nullable().references('id').inTable('tenant_controls').onDelete('SET NULL');
            table.boolean('checked').defaultTo(false);
            table.text('notes').nullable();
        });
        this.schema.createTable('audit_findings', (table) => {
            table.increments('id');
            table.integer('audit_id').unsigned().notNullable().references('id').inTable('audits').onDelete('CASCADE');
            table.string('finding_title', 300).notNullable();
            table.enum('finding_type', ['nonconformity', 'observation', 'opportunity_for_improvement']).notNullable();
            table.enum('severity', ['low', 'medium', 'high', 'critical']).defaultTo('medium');
            table.text('description').nullable();
            table.integer('tenant_control_id').unsigned().nullable().references('id').inTable('tenant_controls').onDelete('SET NULL');
            table.integer('owner_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.enum('status', ['open', 'in_progress', 'closed']).defaultTo('open');
            table.date('due_date').nullable();
            table.timestamps(true, true);
        });
        this.schema.createTable('tasks', (table) => {
            table.increments('id');
            table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('CASCADE');
            table.string('title', 300).notNullable();
            table.text('description').nullable();
            table.enum('source_type', ['gap', 'risk', 'control', 'audit_finding', 'manual']).defaultTo('manual');
            table.integer('source_id').unsigned().nullable();
            table.integer('owner_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.enum('priority', ['low', 'medium', 'high', 'critical']).defaultTo('medium');
            table.enum('status', [
                'open', 'in_progress', 'waiting_for_evidence', 'under_review',
                'completed', 'rejected', 'overdue',
            ]).defaultTo('open');
            table.date('due_date').nullable();
            table.timestamp('completed_at').nullable();
            table.integer('created_by').unsigned().nullable();
            table.integer('updated_by').unsigned().nullable();
            table.timestamps(true, true);
        });
        this.schema.createTable('task_comments', (table) => {
            table.increments('id');
            table.integer('task_id').unsigned().notNullable().references('id').inTable('tasks').onDelete('CASCADE');
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
            table.text('body').notNullable();
            table.timestamp('created_at').notNullable();
        });
        this.schema.createTable('task_attachments', (table) => {
            table.increments('id');
            table.integer('task_id').unsigned().notNullable().references('id').inTable('tasks').onDelete('CASCADE');
            table.string('file_url', 500).notNullable();
            table.string('file_name', 255).notNullable();
            table.integer('uploaded_by').unsigned().nullable();
            table.timestamp('created_at').notNullable();
        });
        this.schema.createTable('password_reset_tokens', (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
            table.string('token', 255).notNullable().unique();
            table.timestamp('expires_at').notNullable();
            table.timestamp('created_at').notNullable();
        });
    }
    async down() {
        this.schema.dropTableIfExists('password_reset_tokens');
        this.schema.dropTableIfExists('task_attachments');
        this.schema.dropTableIfExists('task_comments');
        this.schema.dropTableIfExists('tasks');
        this.schema.dropTableIfExists('audit_findings');
        this.schema.dropTableIfExists('audit_checklist_items');
        this.schema.dropTableIfExists('audits');
        this.schema.dropTableIfExists('policy_acknowledgments');
        this.schema.dropTableIfExists('policy_versions');
        this.schema.dropTableIfExists('policies');
        this.schema.dropTableIfExists('evidence_control_links');
        this.schema.dropTableIfExists('evidence_versions');
        this.schema.dropTableIfExists('evidence');
        this.schema.dropTableIfExists('risk_treatments');
        this.schema.dropTableIfExists('risk_controls');
        this.schema.alterTable('risks', (table) => {
            table.dropColumn('risk_code');
            table.dropColumn('asset_or_process');
            table.dropColumn('inherent_likelihood');
            table.dropColumn('inherent_impact');
            table.dropColumn('inherent_score');
            table.dropColumn('residual_likelihood');
            table.dropColumn('residual_impact');
            table.dropColumn('residual_score');
            table.dropColumn('treatment_option');
            table.dropColumn('target_date');
            table.dropColumn('approval_status');
            table.dropColumn('approved_by');
            table.dropColumn('approved_at');
            table.dropColumn('updated_by');
        });
        this.schema.dropTableIfExists('assessment_responses');
        this.schema.dropTableIfExists('assessments');
        this.schema.dropTableIfExists('tenant_controls');
        this.schema.dropTableIfExists('control_mappings');
        this.schema.dropTableIfExists('controls');
        this.schema.dropTableIfExists('tenant_frameworks');
        this.schema.dropTableIfExists('frameworks');
        this.schema.alterTable('users', (table) => {
            table.dropForeign(['department_id']);
        });
        this.schema.dropTableIfExists('business_units');
        this.schema.dropTableIfExists('locations');
        this.schema.dropTableIfExists('departments');
        this.schema.alterTable('tenants', (table) => {
            table.dropColumn('updated_by');
        });
        this.schema.alterTable('users', (table) => {
            table.dropColumn('last_login');
            table.dropColumn('mfa_enabled');
            table.dropColumn('mfa_secret');
            table.dropColumn('department_id');
            table.dropColumn('updated_by');
        });
    }
}
//# sourceMappingURL=15_mvp_full_schema.js.map