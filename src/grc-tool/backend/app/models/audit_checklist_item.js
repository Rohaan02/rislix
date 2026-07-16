var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import Audit from '#models/audit';
import TenantControl from '#models/tenant_control';
export default class AuditChecklistItem extends BaseModel {
    static table = 'audit_checklist_items';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], AuditChecklistItem.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AuditChecklistItem.prototype, "auditId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AuditChecklistItem.prototype, "tenantControlId", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], AuditChecklistItem.prototype, "checked", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AuditChecklistItem.prototype, "notes", void 0);
__decorate([
    belongsTo(() => Audit),
    __metadata("design:type", Object)
], AuditChecklistItem.prototype, "audit", void 0);
__decorate([
    belongsTo(() => TenantControl),
    __metadata("design:type", Object)
], AuditChecklistItem.prototype, "tenantControl", void 0);
//# sourceMappingURL=audit_checklist_item.js.map