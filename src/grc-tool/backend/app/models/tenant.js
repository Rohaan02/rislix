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
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import User from '#models/user';
import Department from '#models/department';
import Location from '#models/location';
import BusinessUnit from '#models/business_unit';
import TenantFramework from '#models/tenant_framework';
import TenantControl from '#models/tenant_control';
import Assessment from '#models/assessment';
import Evidence from '#models/evidence';
import Policy from '#models/policy';
import Audit from '#models/audit';
import Task from '#models/task';
import Risk from '#models/risk';
export default class Tenant extends BaseModel {
    static table = 'tenants';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Tenant.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Tenant.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Tenant.prototype, "slug", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Tenant.prototype, "industry", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Tenant.prototype, "country", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Tenant.prototype, "website", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Tenant.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Tenant.prototype, "subscriptionPlan", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Tenant.prototype, "updatedBy", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Tenant.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'updatedBy' }),
    __metadata("design:type", Object)
], Tenant.prototype, "updater", void 0);
__decorate([
    hasMany(() => User),
    __metadata("design:type", Object)
], Tenant.prototype, "users", void 0);
__decorate([
    hasMany(() => Department),
    __metadata("design:type", Object)
], Tenant.prototype, "departments", void 0);
__decorate([
    hasMany(() => Location),
    __metadata("design:type", Object)
], Tenant.prototype, "locations", void 0);
__decorate([
    hasMany(() => BusinessUnit),
    __metadata("design:type", Object)
], Tenant.prototype, "businessUnits", void 0);
__decorate([
    hasMany(() => TenantFramework),
    __metadata("design:type", Object)
], Tenant.prototype, "tenantFrameworks", void 0);
__decorate([
    hasMany(() => TenantControl),
    __metadata("design:type", Object)
], Tenant.prototype, "tenantControls", void 0);
__decorate([
    hasMany(() => Assessment),
    __metadata("design:type", Object)
], Tenant.prototype, "assessments", void 0);
__decorate([
    hasMany(() => Evidence),
    __metadata("design:type", Object)
], Tenant.prototype, "evidence", void 0);
__decorate([
    hasMany(() => Policy),
    __metadata("design:type", Object)
], Tenant.prototype, "policies", void 0);
__decorate([
    hasMany(() => Audit),
    __metadata("design:type", Object)
], Tenant.prototype, "audits", void 0);
__decorate([
    hasMany(() => Task),
    __metadata("design:type", Object)
], Tenant.prototype, "tasks", void 0);
__decorate([
    hasMany(() => Risk),
    __metadata("design:type", Object)
], Tenant.prototype, "risks", void 0);
//# sourceMappingURL=tenant.js.map