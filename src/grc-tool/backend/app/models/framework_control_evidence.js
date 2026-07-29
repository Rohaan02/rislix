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
import Control from '#models/control';
import Tenant from '#models/tenant';
import User from '#models/user';
export default class FrameworkControlEvidence extends BaseModel {
    static table = 'framework_control_evidences';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], FrameworkControlEvidence.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], FrameworkControlEvidence.prototype, "controlId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], FrameworkControlEvidence.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], FrameworkControlEvidence.prototype, "fileName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], FrameworkControlEvidence.prototype, "filePath", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], FrameworkControlEvidence.prototype, "fileType", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], FrameworkControlEvidence.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], FrameworkControlEvidence.prototype, "notes", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], FrameworkControlEvidence.prototype, "uploadedBy", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], FrameworkControlEvidence.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], FrameworkControlEvidence.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Control, { foreignKey: 'controlId' }),
    __metadata("design:type", Object)
], FrameworkControlEvidence.prototype, "control", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], FrameworkControlEvidence.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'uploadedBy' }),
    __metadata("design:type", Object)
], FrameworkControlEvidence.prototype, "uploader", void 0);
//# sourceMappingURL=framework_control_evidence.js.map