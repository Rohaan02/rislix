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
import Framework from '#models/framework';
import ControlMapping from '#models/control_mapping';
import TenantControl from '#models/tenant_control';
export default class Control extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Control.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Control.prototype, "frameworkId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Control.prototype, "controlCode", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Control.prototype, "controlTitle", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Control.prototype, "controlDescription", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Control.prototype, "domain", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Control.prototype, "evidenceRequired", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Control.prototype, "controlType", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Control.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], Control.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Framework),
    __metadata("design:type", Object)
], Control.prototype, "framework", void 0);
__decorate([
    hasMany(() => TenantControl),
    __metadata("design:type", Object)
], Control.prototype, "tenantControls", void 0);
__decorate([
    hasMany(() => ControlMapping, { foreignKey: 'sourceControlId' }),
    __metadata("design:type", Object)
], Control.prototype, "sourceMappings", void 0);
__decorate([
    hasMany(() => ControlMapping, { foreignKey: 'targetControlId' }),
    __metadata("design:type", Object)
], Control.prototype, "targetMappings", void 0);
//# sourceMappingURL=control.js.map