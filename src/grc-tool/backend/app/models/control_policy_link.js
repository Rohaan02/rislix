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
import TenantControl from '#models/tenant_control';
import Policy from '#models/policy';
export default class ControlPolicyLink extends BaseModel {
    static table = 'control_policy_links';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], ControlPolicyLink.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ControlPolicyLink.prototype, "tenantControlId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ControlPolicyLink.prototype, "policyId", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], ControlPolicyLink.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], ControlPolicyLink.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => TenantControl),
    __metadata("design:type", Object)
], ControlPolicyLink.prototype, "tenantControl", void 0);
__decorate([
    belongsTo(() => Policy),
    __metadata("design:type", Object)
], ControlPolicyLink.prototype, "policy", void 0);
//# sourceMappingURL=control_policy_link.js.map