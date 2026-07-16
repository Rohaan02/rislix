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
import Assessment from '#models/assessment';
import TenantControl from '#models/tenant_control';
import User from '#models/user';
import Evidence from '#models/evidence';
export default class AssessmentResponse extends BaseModel {
    static table = 'assessment_responses';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], AssessmentResponse.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AssessmentResponse.prototype, "assessmentId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AssessmentResponse.prototype, "tenantControlId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AssessmentResponse.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AssessmentResponse.prototype, "score", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AssessmentResponse.prototype, "comments", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AssessmentResponse.prototype, "ownerId", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], AssessmentResponse.prototype, "dueDate", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AssessmentResponse.prototype, "evidenceId", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], AssessmentResponse.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], AssessmentResponse.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Assessment),
    __metadata("design:type", Object)
], AssessmentResponse.prototype, "assessment", void 0);
__decorate([
    belongsTo(() => TenantControl),
    __metadata("design:type", Object)
], AssessmentResponse.prototype, "tenantControl", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'ownerId' }),
    __metadata("design:type", Object)
], AssessmentResponse.prototype, "owner", void 0);
__decorate([
    belongsTo(() => Evidence),
    __metadata("design:type", Object)
], AssessmentResponse.prototype, "evidence", void 0);
//# sourceMappingURL=assessment_response.js.map