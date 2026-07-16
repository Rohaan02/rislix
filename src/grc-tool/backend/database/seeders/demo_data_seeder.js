import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';
import Tenant from '#models/tenant';
import User from '#models/user';
import Role from '#models/role';
import Risk from '#models/risk';
import RiskHistory from '#models/risk_history';
const DEMO_RISKS = [
    {
        title: 'Unpatched critical CVE on public-facing web server',
        description: 'Vulnerability scan flagged a critical RCE vulnerability on the production web server. No patch has been applied yet.',
        category: 'technical',
        likelihood: 4,
        impact: 5,
        status: 'open',
        treatment: 'Schedule emergency patch window within 48 hours. Apply WAF rule as interim mitigation.',
        daysAgo: 2,
    },
    {
        title: 'Phishing susceptibility among finance team',
        description: 'Recent simulated phishing campaign showed a 38% click-through rate within the finance department.',
        category: 'operational',
        likelihood: 4,
        impact: 4,
        status: 'in_treatment',
        treatment: 'Mandatory security awareness training scheduled for finance team.',
        daysAgo: 14,
    },
    {
        title: 'Single point of failure — primary database server',
        description: 'No automated failover configured for the primary MySQL instance hosting production data.',
        category: 'technical',
        likelihood: 3,
        impact: 5,
        status: 'open',
        treatment: 'Implement read-replica failover and automate promotion via health checks.',
        daysAgo: 30,
    },
    {
        title: 'Vendor lacks SOC 2 attestation',
        description: 'Primary cloud storage vendor has not provided a current SOC 2 Type II report on request.',
        category: 'compliance',
        likelihood: 3,
        impact: 3,
        status: 'in_treatment',
        treatment: 'Request updated attestation within 30 days.',
        daysAgo: 45,
    },
    {
        title: 'Inadequate offboarding process for departing employees',
        description: 'Access revocation for departing staff is manual and has been delayed in 2 of the last 5 cases.',
        category: 'operational',
        likelihood: 3,
        impact: 4,
        status: 'open',
        treatment: 'Build automated offboarding checklist integrated with HR system.',
        daysAgo: 7,
    },
    {
        title: 'Customer data exposure via misconfigured S3 bucket',
        description: 'Internal review found a storage bucket with overly permissive public read access.',
        category: 'technical',
        likelihood: 2,
        impact: 5,
        status: 'closed',
        treatment: 'Bucket policy corrected immediately; access logging enabled.',
        daysAgo: 60,
    },
    {
        title: 'Lack of documented incident response plan',
        description: 'No formal, tested incident response plan exists for security incidents.',
        category: 'compliance',
        likelihood: 3,
        impact: 4,
        status: 'in_treatment',
        treatment: 'Draft IR plan based on NIST SP 800-61.',
        daysAgo: 21,
    },
    {
        title: 'Reputational exposure from social media impersonation',
        description: 'A fake company profile was identified soliciting customer data on a social platform.',
        category: 'reputational',
        likelihood: 2,
        impact: 3,
        status: 'accepted',
        treatment: 'Reported to platform for takedown.',
        daysAgo: 90,
    },
    {
        title: 'Currency exchange volatility affecting vendor contracts',
        description: 'Several vendor contracts are denominated in foreign currency with no hedging in place.',
        category: 'financial',
        likelihood: 3,
        impact: 3,
        status: 'open',
        treatment: 'Evaluate forward contracts for top 3 vendor relationships.',
        daysAgo: 10,
    },
    {
        title: 'Key person dependency — sole DevOps engineer',
        description: 'Production deployment knowledge is concentrated in a single team member with no documented runbooks.',
        category: 'operational',
        likelihood: 3,
        impact: 4,
        status: 'in_treatment',
        treatment: 'Document deployment runbooks; cross-train a second engineer.',
        daysAgo: 18,
    },
    {
        title: 'GDPR data subject request handling delays',
        description: 'Two recent data subject access requests exceeded the 30-day regulatory response window.',
        category: 'compliance',
        likelihood: 2,
        impact: 4,
        status: 'open',
        treatment: 'Implement DSAR tracking tool with automated SLA reminders.',
        daysAgo: 5,
    },
    {
        title: 'Office physical access — tailgating observed',
        description: 'Security walkthrough observed unbadged individuals entering via tailgating on two occasions.',
        category: 'physical',
        likelihood: 3,
        impact: 2,
        status: 'in_treatment',
        treatment: 'Install mantrap-style entry and reinforce tailgating policy.',
        daysAgo: 25,
    },
    {
        title: 'Strategic dependency on single cloud provider',
        description: 'All production infrastructure runs on a single cloud provider with no multi-cloud or DR strategy.',
        category: 'strategic',
        likelihood: 2,
        impact: 5,
        status: 'accepted',
        treatment: 'Risk accepted at current scale; revisit at next funding round.',
        daysAgo: 120,
    },
    {
        title: 'Outdated TLS configuration on legacy API endpoint',
        description: 'Legacy partner API still accepts TLS 1.0/1.1 connections, flagged in last pen test.',
        category: 'technical',
        likelihood: 2,
        impact: 3,
        status: 'in_treatment',
        treatment: 'Coordinate with partner to migrate to TLS 1.2+.',
        daysAgo: 33,
    },
    {
        title: 'Insufficient backup testing cadence',
        description: 'Backups run nightly but the last successful restore test was over 6 months ago.',
        category: 'operational',
        likelihood: 2,
        impact: 4,
        status: 'open',
        treatment: 'Schedule quarterly restore drills.',
        daysAgo: 12,
    },
    {
        title: 'Minor branding inconsistency across marketing channels',
        description: 'Logo usage and brand colors are inconsistent across recent campaign assets.',
        category: 'reputational',
        likelihood: 2,
        impact: 1,
        status: 'closed',
        treatment: 'Brand guidelines redistributed to marketing team.',
        daysAgo: 75,
    },
    {
        title: 'Unencrypted laptop hard drives for field staff',
        description: 'Audit found 4 of 12 field laptops do not have full-disk encryption enabled.',
        category: 'physical',
        likelihood: 3,
        impact: 4,
        status: 'open',
        treatment: 'Enforce BitLocker/FileVault via MDM policy.',
        daysAgo: 4,
    },
    {
        title: 'Budget overrun risk on compliance tooling renewal',
        description: 'Annual GRC and security tooling renewals trending 22% over allocated budget.',
        category: 'financial',
        likelihood: 4,
        impact: 2,
        status: 'in_treatment',
        treatment: 'Renegotiate vendor contracts; consolidate overlapping tools.',
        daysAgo: 9,
    },
];
export default class DemoDataSeeder extends BaseSeeder {
    async run() {
        const tenant = await Tenant.findBy('slug', 'rislix-demo');
        if (!tenant) {
            console.log('⚠️  Run organization_seeder before demo_data_seeder. Skipping.');
            return;
        }
        const adminUser = await User.findBy('email', 'admin@rislix.io');
        if (!adminUser) {
            console.log('⚠️  Admin user not found. Run organization_seeder first. Skipping.');
            return;
        }
        const grcManagerRole = await Role.findBy('name', 'grc_manager');
        const analystRole = await Role.findBy('name', 'analyst');
        const auditorRole = await Role.findBy('name', 'auditor');
        const demoUsers = [
            { email: 'sara.khan@rislix.io', fullName: 'Sara Khan', roleId: grcManagerRole?.id ?? null },
            { email: 'ahmed.raza@rislix.io', fullName: 'Ahmed Raza', roleId: analystRole?.id ?? null },
            { email: 'fatima.noor@rislix.io', fullName: 'Fatima Noor', roleId: auditorRole?.id ?? null },
        ];
        const createdUsers = [adminUser];
        for (const u of demoUsers) {
            const user = await User.updateOrCreate({ email: u.email }, {
                fullName: u.fullName,
                email: u.email,
                password: 'Demo@12345',
                roleId: u.roleId,
                tenantId: tenant.id,
                status: 'active',
            });
            createdUsers.push(user);
        }
        let created = 0;
        for (const r of DEMO_RISKS) {
            const exists = await Risk.query()
                .where('tenant_id', tenant.id)
                .where('title', r.title)
                .first();
            if (exists)
                continue;
            const owner = createdUsers[created % createdUsers.length];
            const createdAt = DateTime.now().minus({ days: r.daysAgo });
            const risk = await Risk.create({
                tenantId: tenant.id,
                title: r.title,
                description: r.description,
                category: r.category,
                likelihood: r.likelihood,
                impact: r.impact,
                status: r.status,
                treatment: r.treatment ?? null,
                ownerId: owner.id,
                createdBy: adminUser.id,
                reviewDate: DateTime.now().plus({ days: 30 + (created % 5) * 15 }),
            });
            risk.createdAt = createdAt;
            risk.updatedAt = createdAt;
            await risk.save();
            await RiskHistory.create({
                riskId: risk.id,
                likelihood: risk.likelihood,
                impact: risk.impact,
                riskScore: risk.riskScore,
                riskTier: risk.riskTier,
                status: risk.status,
                changedBy: adminUser.id,
            });
            created++;
        }
        console.log(`✅  Demo data seeded: ${created} risks, ${demoUsers.length} additional users.`);
        console.log('    Demo user password (all): Demo@12345');
    }
}
//# sourceMappingURL=demo_data_seeder.js.map