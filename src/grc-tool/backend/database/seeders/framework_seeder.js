import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Framework from '#models/framework';
import Control from '#models/control';
import ControlMapping from '#models/control_mapping';
const FRAMEWORKS = [
    {
        name: 'ISO 27001',
        version: '2022',
        description: 'Information security management systems',
        controls: [
            { code: 'A.5.1', title: 'Policies for information security', domain: 'Organizational', type: 'preventive' },
            { code: 'A.5.2', title: 'Information security roles and responsibilities', domain: 'Organizational', type: 'preventive' },
            { code: 'A.8.1', title: 'User endpoint devices', domain: 'Technological', type: 'preventive' },
            { code: 'A.8.5', title: 'Secure authentication', domain: 'Technological', type: 'preventive' },
            { code: 'A.8.24', title: 'Use of cryptography', domain: 'Technological', type: 'preventive' },
        ],
    },
    {
        name: 'SOC 2',
        version: '2017',
        description: 'Trust Services Criteria',
        controls: [
            { code: 'CC1.1', title: 'COSO principle — integrity and ethical values', domain: 'Common Criteria', type: 'preventive' },
            { code: 'CC6.1', title: 'Logical and physical access controls', domain: 'Common Criteria', type: 'preventive' },
            { code: 'CC7.2', title: 'Detection of security events', domain: 'Common Criteria', type: 'detective' },
            { code: 'CC8.1', title: 'Change management', domain: 'Common Criteria', type: 'preventive' },
        ],
    },
    {
        name: 'ISO 42001',
        version: '2023',
        description: 'AI management system',
        controls: [
            { code: 'A.5.1', title: 'AI policy', domain: 'Governance', type: 'preventive' },
            { code: 'A.6.2', title: 'AI roles and responsibilities', domain: 'Governance', type: 'preventive' },
            { code: 'A.8.1', title: 'AI system impact assessment', domain: 'Operations', type: 'detective' },
        ],
    },
    {
        name: 'GDPR',
        version: '2016/679',
        description: 'General Data Protection Regulation basics',
        controls: [
            { code: 'Art.5', title: 'Principles relating to processing of personal data', domain: 'Principles', type: 'preventive' },
            { code: 'Art.25', title: 'Data protection by design and by default', domain: 'Rights', type: 'preventive' },
            { code: 'Art.32', title: 'Security of processing', domain: 'Security', type: 'preventive' },
            { code: 'Art.33', title: 'Notification of a personal data breach', domain: 'Breach', type: 'corrective' },
        ],
    },
    {
        name: 'Custom',
        version: '1.0',
        description: 'Custom organizational framework',
        controls: [
            { code: 'CUST-01', title: 'Custom security baseline', domain: 'Custom', type: 'preventive' },
            { code: 'CUST-02', title: 'Custom access review', domain: 'Custom', type: 'detective' },
        ],
    },
];
export default class FrameworkSeeder extends BaseSeeder {
    async run() {
        const controlIdByCode = new Map();
        for (const fw of FRAMEWORKS) {
            const framework = await Framework.updateOrCreate({ name: fw.name }, { name: fw.name, version: fw.version, description: fw.description, status: 'active' });
            for (const c of fw.controls) {
                const control = await Control.updateOrCreate({ frameworkId: framework.id, controlCode: c.code }, {
                    frameworkId: framework.id,
                    controlCode: c.code,
                    controlTitle: c.title,
                    controlDescription: `${c.title} — sample control for ${fw.name}`,
                    domain: c.domain,
                    evidenceRequired: 'Policy document or configuration evidence',
                    controlType: c.type,
                });
                controlIdByCode.set(`${fw.name}:${c.code}`, control.id);
            }
        }
        const isoAccess = controlIdByCode.get('ISO 27001:A.8.5');
        const socAccess = controlIdByCode.get('SOC 2:CC6.1');
        if (isoAccess && socAccess) {
            await ControlMapping.updateOrCreate({ sourceControlId: isoAccess, targetControlId: socAccess }, { sourceControlId: isoAccess, targetControlId: socAccess, mappingType: 'equivalent' });
        }
        const gdprSecurity = controlIdByCode.get('GDPR:Art.32');
        if (isoAccess && gdprSecurity) {
            await ControlMapping.updateOrCreate({ sourceControlId: isoAccess, targetControlId: gdprSecurity }, { sourceControlId: isoAccess, targetControlId: gdprSecurity, mappingType: 'related' });
        }
        console.log('✅  Frameworks, controls, and mappings seeded.');
    }
}
//# sourceMappingURL=framework_seeder.js.map