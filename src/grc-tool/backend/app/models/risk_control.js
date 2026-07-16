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
import Risk from '#models/risk';
import TenantControl from '#models/tenant_control';
export default class RiskControl extends BaseModel {
    static table = 'risk_controls';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], RiskControl.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], RiskControl.prototype, "riskId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], RiskControl.prototype, "tenantControlId", void 0);
__decorate([
    belongsTo(() => Risk),
    __metadata("design:type", Object)
], RiskControl.prototype, "risk", void 0);
__decorate([
    belongsTo(() => TenantControl),
    __metadata("design:type", Object)
], RiskControl.prototype, "tenantControl", void 0);
//# sourceMappingURL=risk_control.js.map