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
import Framework from '#models/framework';
export default class TenantFramework extends BaseModel {
    static table = 'tenant_frameworks';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], TenantFramework.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], TenantFramework.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], TenantFramework.prototype, "frameworkId", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], TenantFramework.prototype, "enabledAt", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], TenantFramework.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => Framework),
    __metadata("design:type", Object)
], TenantFramework.prototype, "framework", void 0);
//# sourceMappingURL=tenant_framework.js.map