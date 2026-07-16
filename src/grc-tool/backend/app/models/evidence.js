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
import EvidenceVersion from '#models/evidence_version';
import EvidenceControlLink from '#models/evidence_control_link';
export default class Evidence extends BaseModel {
    static table = 'evidence';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Evidence.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Evidence.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Evidence.prototype, "title", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Evidence.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Evidence.prototype, "fileUrl", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Evidence.prototype, "evidenceType", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Evidence.prototype, "ownerId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Evidence.prototype, "status", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], Evidence.prototype, "expiryDate", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], Evidence.prototype, "reviewDate", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Evidence.prototype, "version", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Evidence.prototype, "uploadedBy", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Evidence.prototype, "auditorComments", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Evidence.prototype, "createdBy", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Evidence.prototype, "updatedBy", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Evidence.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], Evidence.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], Evidence.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'ownerId' }),
    __metadata("design:type", Object)
], Evidence.prototype, "owner", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'uploadedBy' }),
    __metadata("design:type", Object)
], Evidence.prototype, "uploader", void 0);
__decorate([
    hasMany(() => EvidenceVersion),
    __metadata("design:type", Object)
], Evidence.prototype, "versions", void 0);
__decorate([
    hasMany(() => EvidenceControlLink),
    __metadata("design:type", Object)
], Evidence.prototype, "controlLinks", void 0);
//# sourceMappingURL=evidence.js.map