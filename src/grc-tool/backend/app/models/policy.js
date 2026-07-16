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
import User from '#models/user';
import PolicyVersion from '#models/policy_version';
export default class Policy extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Policy.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Policy.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Policy.prototype, "title", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Policy.prototype, "documentType", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Policy.prototype, "ownerId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Policy.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Policy.prototype, "reviewFrequency", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], Policy.prototype, "nextReviewDate", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Policy.prototype, "isTemplate", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Policy.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], Policy.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], Policy.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'ownerId' }),
    __metadata("design:type", Object)
], Policy.prototype, "owner", void 0);
__decorate([
    hasMany(() => PolicyVersion),
    __metadata("design:type", Object)
], Policy.prototype, "versions", void 0);
//# sourceMappingURL=policy.js.map