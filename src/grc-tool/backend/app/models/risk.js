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
import { BaseModel, column, belongsTo, hasMany, beforeSave } from '@adonisjs/lucid/orm';
import Tenant from '#models/tenant';
import User from '#models/user';
import RiskHistory from '#models/risk_history';
import RiskTreatment from '#models/risk_treatment';
import RiskControl from '#models/risk_control';
function calcTier(score) {
    if (score <= 3)
        return 'low';
    if (score <= 6)
        return 'medium';
    return 'high';
}
export default class Risk extends BaseModel {
    static calculateScore(risk) {
        risk.riskScore = risk.likelihood * risk.impact;
        risk.riskTier = calcTier(risk.riskScore);
        if (risk.inherentLikelihood != null && risk.inherentImpact != null) {
            risk.inherentScore = risk.inherentLikelihood * risk.inherentImpact;
        }
        if (risk.residualLikelihood != null && risk.residualImpact != null) {
            risk.residualScore = risk.residualLikelihood * risk.residualImpact;
        }
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Risk.prototype, "id", void 0);
__decorate([
    column({ columnName: 'tenant_id' }),
    __metadata("design:type", Number)
], Risk.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Risk.prototype, "title", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Risk.prototype, "category", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Risk.prototype, "likelihood", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Risk.prototype, "impact", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Risk.prototype, "riskScore", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Risk.prototype, "riskTier", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Risk.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "treatment", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "ownerId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "createdBy", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], Risk.prototype, "reviewDate", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "riskCode", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "assetOrProcess", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "inherentLikelihood", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "inherentImpact", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "inherentScore", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "residualLikelihood", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "residualImpact", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "residualScore", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "treatmentOption", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], Risk.prototype, "targetDate", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Risk.prototype, "approvalStatus", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "approvedBy", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Risk.prototype, "approvedAt", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Risk.prototype, "updatedBy", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Risk.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], Risk.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], Risk.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'ownerId' }),
    __metadata("design:type", Object)
], Risk.prototype, "owner", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'createdBy' }),
    __metadata("design:type", Object)
], Risk.prototype, "creator", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'approvedBy' }),
    __metadata("design:type", Object)
], Risk.prototype, "approver", void 0);
__decorate([
    hasMany(() => RiskHistory),
    __metadata("design:type", Object)
], Risk.prototype, "history", void 0);
__decorate([
    hasMany(() => RiskTreatment),
    __metadata("design:type", Object)
], Risk.prototype, "treatments", void 0);
__decorate([
    hasMany(() => RiskControl),
    __metadata("design:type", Object)
], Risk.prototype, "controlLinks", void 0);
__decorate([
    beforeSave(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Risk]),
    __metadata("design:returntype", void 0)
], Risk, "calculateScore", null);
//# sourceMappingURL=risk.js.map