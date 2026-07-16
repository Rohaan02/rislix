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
import Evidence from '#models/evidence';
import TenantControl from '#models/tenant_control';
import Tenant from '#models/tenant';
export default class EvidenceControlLink extends BaseModel {
    static table = 'evidence_control_links';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], EvidenceControlLink.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], EvidenceControlLink.prototype, "evidenceId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], EvidenceControlLink.prototype, "tenantControlId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], EvidenceControlLink.prototype, "tenantId", void 0);
__decorate([
    belongsTo(() => Evidence),
    __metadata("design:type", Object)
], EvidenceControlLink.prototype, "evidence", void 0);
__decorate([
    belongsTo(() => TenantControl),
    __metadata("design:type", Object)
], EvidenceControlLink.prototype, "tenantControl", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], EvidenceControlLink.prototype, "tenant", void 0);
//# sourceMappingURL=evidence_control_link.js.map