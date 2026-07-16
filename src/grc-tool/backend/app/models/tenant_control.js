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
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import Tenant from '#models/tenant';
import Control from '#models/control';
import User from '#models/user';
import EvidenceControlLink from '#models/evidence_control_link';
export default class TenantControl extends BaseModel {
    static table = 'tenant_controls';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], TenantControl.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], TenantControl.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], TenantControl.prototype, "controlId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], TenantControl.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TenantControl.prototype, "ownerId", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], TenantControl.prototype, "applicability", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TenantControl.prototype, "comments", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], TenantControl.prototype, "dueDate", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TenantControl.prototype, "testResult", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TenantControl.prototype, "testNotes", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TenantControl.prototype, "testedBy", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], TenantControl.prototype, "testedAt", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], TenantControl.prototype, "nextTestDate", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TenantControl.prototype, "createdBy", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TenantControl.prototype, "updatedBy", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], TenantControl.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], TenantControl.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], TenantControl.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => Control),
    __metadata("design:type", Object)
], TenantControl.prototype, "control", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'ownerId' }),
    __metadata("design:type", Object)
], TenantControl.prototype, "owner", void 0);
__decorate([
    hasMany(() => EvidenceControlLink),
    __metadata("design:type", Object)
], TenantControl.prototype, "evidenceLinks", void 0);
//# sourceMappingURL=tenant_control.js.map