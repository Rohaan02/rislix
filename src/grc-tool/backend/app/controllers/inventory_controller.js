import InventoryItem from '#models/inventory_item';
import { getRequestTenantId } from '#helpers/tenant_scope';
import ExcelJS from 'exceljs';
const VALID_CATEGORIES = ['people', 'process', 'technology'];
const VALID_CLASSIFICATIONS = ['TLP:WHITE', 'TLP:GREEN', 'TLP:AMBER', 'TLP:RED', 'TLP:RED PII'];
function calcScore(c, i, a) {
    const score = c * i * a;
    const value = score >= 20 ? 'high' : score >= 9 ? 'medium' : 'low';
    return { assetScore: score, assetValue: value };
}
export default class InventoryController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { category } = ctx.request.qs();
        const query = InventoryItem.query()
            .where('tenant_id', tenantId)
            .orderBy('asset_group')
            .orderBy('information_asset');
        if (category)
            query.where('category', category);
        const items = await query;
        return ctx.response.ok(items);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const body = ctx.request.only([
            'category', 'assetGroup', 'informationAsset', 'assetOwner',
            'classification', 'confidentiality', 'integrity', 'availability',
        ]);
        const c = Number(body.confidentiality);
        const i = Number(body.integrity);
        const a = Number(body.availability);
        const { assetScore, assetValue } = calcScore(c, i, a);
        const item = await InventoryItem.create({
            tenantId,
            category: body.category,
            assetGroup: String(body.assetGroup),
            informationAsset: String(body.informationAsset),
            assetOwner: String(body.assetOwner),
            classification: String(body.classification),
            confidentiality: c,
            integrity: i,
            availability: a,
            assetScore,
            assetValue,
        });
        return ctx.response.created(item);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const item = await InventoryItem.query()
            .where('id', ctx.params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const body = ctx.request.only([
            'category', 'assetGroup', 'informationAsset', 'assetOwner',
            'classification', 'confidentiality', 'integrity', 'availability',
        ]);
        const c = Number(body.confidentiality ?? item.confidentiality);
        const i = Number(body.integrity ?? item.integrity);
        const a = Number(body.availability ?? item.availability);
        const { assetScore, assetValue } = calcScore(c, i, a);
        item.merge({
            category: body.category ?? item.category,
            assetGroup: String(body.assetGroup ?? item.assetGroup),
            informationAsset: String(body.informationAsset ?? item.informationAsset),
            assetOwner: String(body.assetOwner ?? item.assetOwner),
            classification: String(body.classification ?? item.classification),
            confidentiality: c,
            integrity: i,
            availability: a,
            assetScore,
            assetValue,
        });
        await item.save();
        return ctx.response.ok(item);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const item = await InventoryItem.query()
            .where('id', ctx.params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await item.delete();
        return ctx.response.noContent();
    }
    async downloadTemplate(ctx) {
        const { request, response } = ctx;
        const category = String(request.qs().category ?? 'people').toLowerCase();
        const label = category === 'technology' ? 'Technology / Infrastructure' : category.charAt(0).toUpperCase() + category.slice(1);
        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet(`${label} Inventory`);
        ws.columns = [
            { header: 'Asset Group', key: 'assetGroup', width: 28 },
            { header: 'Information Asset', key: 'informationAsset', width: 32 },
            { header: 'Asset Owner', key: 'assetOwner', width: 20 },
            { header: 'Classification', key: 'classification', width: 16 },
            { header: 'Confidentiality (1-3)', key: 'confidentiality', width: 20 },
            { header: 'Integrity (1-3)', key: 'integrity', width: 16 },
            { header: 'Availability (1-3)', key: 'availability', width: 18 },
        ];
        const headerRow = ws.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A5F' } };
        const exampleByCategory = {
            people: ['Senior Management', 'Chief Executive Officer (CEO)', 'HR', 'TLP:RED', 3, 3, 2],
            process: ['Data Management', 'Data Backup Procedure', 'IT', 'TLP:AMBER', 2, 3, 3],
            technology: ['Cloud Infrastructure', 'AWS Production Account', 'IT Operations', 'TLP:RED', 3, 3, 3],
        };
        ws.addRow(exampleByCategory[category] ?? exampleByCategory['people']);
        const hint = ws.addRow([
            '', '', '',
            'TLP:WHITE / TLP:GREEN / TLP:AMBER / TLP:RED / TLP:RED PII',
            '1=Low  2=Med  3=High',
            '1-3',
            '1-3',
        ]);
        hint.font = { italic: true, color: { argb: 'FF999999' } };
        response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        response.header('Content-Disposition', `attachment; filename="inventory-${category}-template.xlsx"`);
        const buffer = await wb.xlsx.writeBuffer();
        return response.send(buffer);
    }
    async bulkUpload(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const category = String(request.input('category', '')).trim().toLowerCase();
        if (!VALID_CATEGORIES.includes(category)) {
            return response.badRequest({ message: `Invalid category "${category}". Must be: people, process, or technology.` });
        }
        const file = request.file('file', { extnames: ['xlsx', 'xls'], size: '10mb' });
        if (!file)
            return response.badRequest({ message: 'No file uploaded.' });
        if (file.hasErrors)
            return response.badRequest({ message: file.errors[0]?.message ?? 'Invalid file.' });
        const wb = new ExcelJS.Workbook();
        await wb.xlsx.readFile(file.tmpPath);
        const ws = wb.worksheets[0];
        if (!ws)
            return response.badRequest({ message: 'Could not read worksheet.' });
        const toCreate = [];
        const errors = [];
        ws.eachRow((row, rowNumber) => {
            if (rowNumber === 1)
                return;
            const vals = row.values;
            const assetGroup = String(vals[1] ?? '').trim();
            const informationAsset = String(vals[2] ?? '').trim();
            const assetOwner = String(vals[3] ?? '').trim();
            const classification = String(vals[4] ?? '').trim();
            const c = Number(vals[5]);
            const i = Number(vals[6]);
            const a = Number(vals[7]);
            if (!assetGroup && !informationAsset)
                return;
            if (!assetGroup) {
                errors.push({ row: rowNumber, reason: 'Asset Group is required.' });
                return;
            }
            if (!informationAsset) {
                errors.push({ row: rowNumber, reason: 'Information Asset is required.' });
                return;
            }
            if (!assetOwner) {
                errors.push({ row: rowNumber, reason: 'Asset Owner is required.' });
                return;
            }
            if (!VALID_CLASSIFICATIONS.includes(classification)) {
                errors.push({ row: rowNumber, reason: `Invalid classification "${vals[4]}". Must be one of: ${VALID_CLASSIFICATIONS.join(', ')}.` });
                return;
            }
            if (![1, 2, 3].includes(c) || ![1, 2, 3].includes(i) || ![1, 2, 3].includes(a)) {
                errors.push({ row: rowNumber, reason: 'Confidentiality, Integrity, and Availability must each be 1, 2, or 3.' });
                return;
            }
            const { assetScore, assetValue } = calcScore(c, i, a);
            toCreate.push({
                tenantId, category,
                assetGroup, informationAsset, assetOwner, classification,
                confidentiality: c, integrity: i, availability: a,
                assetScore, assetValue,
            });
        });
        if (toCreate.length > 0) {
            await InventoryItem.createMany(toCreate);
        }
        return response.ok({
            created: toCreate.length,
            skipped: errors.length,
            errors,
        });
    }
}
//# sourceMappingURL=inventory_controller.js.map