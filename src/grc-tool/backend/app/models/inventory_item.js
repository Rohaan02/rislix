var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import Tenant from '#models/tenant';
export default class InventoryItem extends BaseModel {
    static table = 'inventory_items';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], InventoryItem.prototype, "id", void 0);
__decorate([
    column({ columnName: 'tenant_id' }),
    __metadata("design:type", Number)
], InventoryItem.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], InventoryItem.prototype, "category", void 0);
__decorate([
    column({ columnName: 'asset_group' }),
    __metadata("design:type", String)
], InventoryItem.prototype, "assetGroup", void 0);
__decorate([
    column({ columnName: 'information_asset' }),
    __metadata("design:type", String)
], InventoryItem.prototype, "informationAsset", void 0);
__decorate([
    column({ columnName: 'asset_owner' }),
    __metadata("design:type", String)
], InventoryItem.prototype, "assetOwner", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], InventoryItem.prototype, "classification", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], InventoryItem.prototype, "confidentiality", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], InventoryItem.prototype, "integrity", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], InventoryItem.prototype, "availability", void 0);
__decorate([
    column({ columnName: 'asset_score' }),
    __metadata("design:type", Number)
], InventoryItem.prototype, "assetScore", void 0);
__decorate([
    column({ columnName: 'asset_value' }),
    __metadata("design:type", String)
], InventoryItem.prototype, "assetValue", void 0);
__decorate([
    column.dateTime({ autoCreate: true, columnName: 'created_at' }),
    __metadata("design:type", DateTime)
], InventoryItem.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' }),
    __metadata("design:type", DateTime)
], InventoryItem.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], InventoryItem.prototype, "tenant", void 0);
//# sourceMappingURL=inventory_item.js.map