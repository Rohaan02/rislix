import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Tenant from '#models/tenant';
import Policy from '#models/policy';
import PolicyVersion from '#models/policy_version';
const TEMPLATES = [
    { title: 'Information Security Policy', documentType: 'policy', reviewFrequency: 'annual' },
    { title: 'Risk Management Policy', documentType: 'policy', reviewFrequency: 'annual' },
    { title: 'Access Control Policy', documentType: 'policy', reviewFrequency: 'annual' },
    { title: 'Incident Management Policy', documentType: 'policy', reviewFrequency: 'annual' },
    { title: 'Supplier Security Policy', documentType: 'policy', reviewFrequency: 'annual' },
    { title: 'AI Governance Policy', documentType: 'policy', reviewFrequency: 'annual' },
    { title: 'Privacy Policy', documentType: 'policy', reviewFrequency: 'annual' },
    { title: 'Business Continuity Policy', documentType: 'policy', reviewFrequency: 'annual' },
    { title: 'Statement of Applicability', documentType: 'soa', reviewFrequency: 'annual' },
    { title: 'Risk Treatment Plan', documentType: 'plan', reviewFrequency: 'quarterly' },
];
export default class PolicyTemplateSeeder extends BaseSeeder {
    async run() {
        const tenant = await Tenant.findBy('slug', 'rislix-demo');
        if (!tenant) {
            console.log('⚠️  Demo tenant not found. Run organization_seeder first. Skipping policy templates.');
            return;
        }
        for (const tpl of TEMPLATES) {
            const policy = await Policy.updateOrCreate({ tenantId: tenant.id, title: tpl.title, isTemplate: true }, {
                tenantId: tenant.id,
                title: tpl.title,
                documentType: tpl.documentType,
                status: 'draft',
                reviewFrequency: tpl.reviewFrequency,
                isTemplate: true,
                ownerId: null,
                nextReviewDate: null,
            });
            await PolicyVersion.updateOrCreate({ policyId: policy.id, versionNumber: 1 }, { policyId: policy.id, versionNumber: 1, status: 'draft', fileUrl: null });
        }
        console.log('✅  Policy templates seeded.');
    }
}
//# sourceMappingURL=policy_template_seeder.js.map