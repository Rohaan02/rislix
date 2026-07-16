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
import Framework from '#models/framework';
import User from '#models/user';
import AuditChecklistItem from '#models/audit_checklist_item';
import AuditFinding from '#models/audit_finding';
export default class Audit extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Audit.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Audit.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Audit.prototype, "auditTitle", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Audit.prototype, "auditType", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Audit.prototype, "frameworkId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Audit.prototype, "scope", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], Audit.prototype, "startDate", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], Audit.prototype, "endDate", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Audit.prototype, "auditorId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Audit.prototype, "status", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Audit.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], Audit.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], Audit.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => Framework),
    __metadata("design:type", Object)
], Audit.prototype, "framework", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'auditorId' }),
    __metadata("design:type", Object)
], Audit.prototype, "auditor", void 0);
__decorate([
    hasMany(() => AuditChecklistItem),
    __metadata("design:type", Object)
], Audit.prototype, "checklistItems", void 0);
__decorate([
    hasMany(() => AuditFinding),
    __metadata("design:type", Object)
], Audit.prototype, "findings", void 0);
//# sourceMappingURL=audit.js.map