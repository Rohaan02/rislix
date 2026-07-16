import InventoryItem from '#models/inventory_item';
import { getRequestTenantId } from '#helpers/tenant_scope';
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
}
//# sourceMappingURL=inventory_controller.js.map