import { BaseSeeder } from '@adonisjs/lucid/seeders';
import db from '@adonisjs/lucid/services/db';
import Tenant from '#models/tenant';
const PEOPLE = [
    { asset_group: 'Senior Management/C-Layer', information_asset: 'Chief Executive Office (CEO)', asset_owner: 'HR', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Senior Management/C-Layer', information_asset: 'Chief Financial Officer (CFO)', asset_owner: 'HR', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Senior Management/C-Layer', information_asset: 'Chief Information Officer (CIO)', asset_owner: 'HR', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Senior Management/C-Layer', information_asset: 'Chief Operating Officer (COO)', asset_owner: 'HR', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Supporting Departments Head', information_asset: 'Accounts & Finance Head', asset_owner: 'HR', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Supporting Departments Head', information_asset: 'HR Department Head', asset_owner: 'HR', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Supporting Departments Head', information_asset: 'IT Department Head', asset_owner: 'HR', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Supporting Departments Head', information_asset: 'Customer Success Department Head', asset_owner: 'HR', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Supporting Departments Head', information_asset: 'GRC Head', asset_owner: 'HR', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Business Lines Head (BLH)', information_asset: 'BlockChain/Bloxbytes Head', asset_owner: 'HR', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Business Lines Head (BLH)', information_asset: 'Design/Crux Head', asset_owner: 'HR', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Business Lines Head (BLH)', information_asset: 'DevOps Head', asset_owner: 'HR', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Business Lines Head (BLH)', information_asset: 'Marketing and Sales Head', asset_owner: 'HR', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Managers', information_asset: 'Business Line Project Managers', asset_owner: 'HR', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Managers', information_asset: 'Business Analysis Manager', asset_owner: 'HR', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Managers', information_asset: 'Technical Manager', asset_owner: 'HR', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Permanent Employees', information_asset: 'Generic Permanent Employees', asset_owner: 'HR', classification: 'TLP:AMBER', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Contractors', information_asset: 'Generic Contractors', asset_owner: 'HR', classification: 'TLP:AMBER', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Internees', information_asset: 'Generic Internees', asset_owner: 'HR', classification: 'TLP:AMBER', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
];
const PROCESS = [
    { asset_group: 'Departmental Level Documents', information_asset: 'Internal Docs of All Depts', asset_owner: 'HOD/BLH', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Departmental Level Docs with PII', information_asset: 'Internal Docs of HR Dept', asset_owner: 'HR', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Departmental Level Docs with PII', information_asset: 'Internal Docs of Finance Dept', asset_owner: 'Finance', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Organizational Level Documents', information_asset: 'HR Policies', asset_owner: 'HR', classification: 'TLP:AMBER', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Organizational Level Documents', information_asset: 'Quality Policies', asset_owner: 'GRC', classification: 'TLP:AMBER', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Organizational Level Documents', information_asset: 'Information Security Policies', asset_owner: 'GRC', classification: 'TLP:AMBER', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Organizational Level Documents', information_asset: 'Health and Safety Policies', asset_owner: 'GRC', classification: 'TLP:AMBER', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Organizational Level Docs with PII', information_asset: 'Payroll Docs', asset_owner: 'Finance', classification: 'TLP:RED PII', confidentiality: 2, integrity: 3, availability: 3, asset_score: 18, asset_value: 'medium' },
];
const TECHNOLOGY = [
    { asset_group: 'Internally Provided Services', information_asset: 'IT Services', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Internally Provided Services', information_asset: 'Admin Services', asset_owner: 'Admin', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Internally Provided Services', information_asset: 'PS Dept Services', asset_owner: 'PS', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Internally Provided Services', information_asset: 'HR Services', asset_owner: 'HR', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Internally Provided Services', information_asset: 'GRC Services', asset_owner: 'GRC', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Internally Provided Services', information_asset: 'BC Services', asset_owner: 'BC', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Internally Provided Services', information_asset: 'DevOps Services', asset_owner: 'DevOps', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Internally Provided Services', information_asset: 'Design Services', asset_owner: 'Design', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Internally Provided Services', information_asset: 'MSBD Services', asset_owner: 'MSBD', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Internally Provided Services', information_asset: 'Financial Services', asset_owner: 'MSBD', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Externally Provided Services', information_asset: 'Software and Product Development Services', asset_owner: 'PS', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Externally Provided Services', information_asset: 'Blockchain Development Services', asset_owner: 'BC', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Externally Provided Services', information_asset: 'NFT Development Services', asset_owner: 'BC', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Externally Provided Services', information_asset: 'Metaverse Development Services', asset_owner: 'BC', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Externally Provided Services', information_asset: 'Design Services (External)', asset_owner: 'Design', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Externally Provided Services', information_asset: 'Customer Support Service', asset_owner: 'CS', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Externally Provided Services', information_asset: 'Software/Product Online-Cloud Platform Support Services (PS)', asset_owner: 'PS', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Externally Provided Services', information_asset: 'Software/Product Online-Cloud Platform Support Services (BC)', asset_owner: 'BC', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Software Products/Apps', information_asset: 'Cartzy Platform', asset_owner: 'PS', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Software Products/Apps', information_asset: 'Sales Pop App', asset_owner: 'PS', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Software Products/Apps', information_asset: 'Wheelify App', asset_owner: 'PS', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Design Products/Repositories', information_asset: 'Design Repository', asset_owner: 'Design', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: "Digital Assets (NFT's)", information_asset: "NFT Assets", asset_owner: 'BC', classification: 'TLP:RED PII', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Cloud Services', information_asset: 'Google Workspace', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Cloud Services', information_asset: 'AWS Services', asset_owner: 'PS', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'On-Site Offices', information_asset: 'Ahmed Block Office', asset_owner: 'Admin', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Remote Offices', information_asset: 'Remote Home Office', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Data Center', information_asset: 'Ahmed Block SR', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Hardware', information_asset: 'Laptops', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 2, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Hardware', information_asset: 'Computers', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 2, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Hardware', information_asset: 'Mobile Phones', asset_owner: 'Admin', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 2, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Hardware', information_asset: 'Printers', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 2, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Hardware', information_asset: 'Projectors', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 2, asset_score: 18, asset_value: 'medium' },
    { asset_group: 'Hardware', information_asset: 'Servers', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Hardware', information_asset: 'Wifi Access Points', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Hardware', information_asset: "CCTV Cameras", asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Hardware', information_asset: 'Biometric Devices', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Hardware', information_asset: 'Network Switches', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Hardware', information_asset: 'Firewalls', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Hardware', information_asset: 'Internet Connectivity Peripherals', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Software', information_asset: 'JIRA', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Software', information_asset: 'MS Office', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'MS Visio', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'MS Project', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'MS SQL Server', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Navicat', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Nitro Pro', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Notepad++', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'PhpStorm', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Sublime Text', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Skype', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Software', information_asset: 'GitHub', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Software', information_asset: 'Slack', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Software', information_asset: 'Norton', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 3, integrity: 3, availability: 3, asset_score: 27, asset_value: 'high' },
    { asset_group: 'Software', information_asset: 'XAMPP', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Postman', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'PuTTY', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 3, availability: 2, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Loom', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'SourceTree', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Chronos', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'WinSCP', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'MS Visual Studio', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Adobe Photoshop', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Adobe Illustrator', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Adobe Acrobat', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Adobe XD', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'GitLab', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Git Bash', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'JMeter', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Toad', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Discord', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Trello', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Canny', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
    { asset_group: 'Software', information_asset: 'Kubernetes / k8s', asset_owner: 'IT', classification: 'TLP:RED', confidentiality: 2, integrity: 2, availability: 3, asset_score: 12, asset_value: 'medium' },
];
export default class InventorySeeder extends BaseSeeder {
    async run() {
        const tenants = await Tenant.all();
        for (const tenant of tenants) {
            const existing = await db.from('inventory_items').where('tenant_id', tenant.id).count('* as total').first();
            if (Number(existing?.total) > 0) {
                console.log(`[${tenant.slug}] Inventory already seeded, skipping`);
                continue;
            }
            const rows = [
                ...PEOPLE.map((r) => ({ ...r, category: 'people' })),
                ...PROCESS.map((r) => ({ ...r, category: 'process' })),
                ...TECHNOLOGY.map((r) => ({ ...r, category: 'technology' })),
            ].map((r) => ({ ...r, tenant_id: tenant.id }));
            await db.table('inventory_items').insert(rows);
            console.log(`[${tenant.slug}] Seeded ${rows.length} inventory items (${PEOPLE.length} people, ${PROCESS.length} process, ${TECHNOLOGY.length} technology)`);
        }
    }
}
//# sourceMappingURL=inventory_seeder.js.map