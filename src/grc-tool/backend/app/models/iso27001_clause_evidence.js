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
import Iso27001Clause from '#models/iso27001_clause';
import Tenant from '#models/tenant';
import User from '#models/user';
export default class Iso27001ClauseEvidence extends BaseModel {
    static table = 'iso27001_clause_evidence';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Iso27001ClauseEvidence.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Iso27001ClauseEvidence.prototype, "clauseId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Iso27001ClauseEvidence.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Iso27001ClauseEvidence.prototype, "fileName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Iso27001ClauseEvidence.prototype, "filePath", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Iso27001ClauseEvidence.prototype, "fileType", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Iso27001ClauseEvidence.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Iso27001ClauseEvidence.prototype, "notes", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Iso27001ClauseEvidence.prototype, "uploadedBy", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Iso27001ClauseEvidence.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], Iso27001ClauseEvidence.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Iso27001Clause, { foreignKey: 'clauseId' }),
    __metadata("design:type", Object)
], Iso27001ClauseEvidence.prototype, "clause", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], Iso27001ClauseEvidence.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'uploadedBy' }),
    __metadata("design:type", Object)
], Iso27001ClauseEvidence.prototype, "uploader", void 0);
//# sourceMappingURL=iso27001_clause_evidence.js.map