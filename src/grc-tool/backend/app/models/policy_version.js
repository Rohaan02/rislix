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
import Policy from '#models/policy';
import PolicyAcknowledgment from '#models/policy_acknowledgment';
export default class PolicyVersion extends BaseModel {
    static table = 'policy_versions';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], PolicyVersion.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], PolicyVersion.prototype, "policyId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], PolicyVersion.prototype, "versionNumber", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], PolicyVersion.prototype, "fileUrl", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], PolicyVersion.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], PolicyVersion.prototype, "approvedBy", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], PolicyVersion.prototype, "approvedAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, columnName: 'created_at' }),
    __metadata("design:type", DateTime)
], PolicyVersion.prototype, "createdAt", void 0);
__decorate([
    belongsTo(() => Policy),
    __metadata("design:type", Object)
], PolicyVersion.prototype, "policy", void 0);
__decorate([
    hasMany(() => PolicyAcknowledgment),
    __metadata("design:type", Object)
], PolicyVersion.prototype, "acknowledgments", void 0);
//# sourceMappingURL=policy_version.js.map