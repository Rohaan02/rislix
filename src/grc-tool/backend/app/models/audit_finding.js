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
import Audit from '#models/audit';
import TenantControl from '#models/tenant_control';
import User from '#models/user';
export default class AuditFinding extends BaseModel {
    static table = 'audit_findings';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], AuditFinding.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AuditFinding.prototype, "auditId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AuditFinding.prototype, "findingTitle", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AuditFinding.prototype, "findingType", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AuditFinding.prototype, "severity", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AuditFinding.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AuditFinding.prototype, "tenantControlId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AuditFinding.prototype, "ownerId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AuditFinding.prototype, "status", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], AuditFinding.prototype, "dueDate", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], AuditFinding.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], AuditFinding.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Audit),
    __metadata("design:type", Object)
], AuditFinding.prototype, "audit", void 0);
__decorate([
    belongsTo(() => TenantControl),
    __metadata("design:type", Object)
], AuditFinding.prototype, "tenantControl", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'ownerId' }),
    __metadata("design:type", Object)
], AuditFinding.prototype, "owner", void 0);
//# sourceMappingURL=audit_finding.js.map