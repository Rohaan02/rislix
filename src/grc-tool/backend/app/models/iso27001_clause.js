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
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
export default class Iso27001Clause extends BaseModel {
    static table = 'iso27001_clauses';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Iso27001Clause.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Iso27001Clause.prototype, "parentId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Iso27001Clause.prototype, "clauseNumber", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Iso27001Clause.prototype, "title", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Iso27001Clause.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Iso27001Clause.prototype, "sortOrder", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Iso27001Clause.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], Iso27001Clause.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Iso27001Clause, { foreignKey: 'parentId' }),
    __metadata("design:type", Object)
], Iso27001Clause.prototype, "parent", void 0);
__decorate([
    hasMany(() => Iso27001Clause, { foreignKey: 'parentId' }),
    __metadata("design:type", Object)
], Iso27001Clause.prototype, "children", void 0);
//# sourceMappingURL=iso27001_clause.js.map