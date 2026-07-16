var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import Control from '#models/control';
export default class ControlMapping extends BaseModel {
    static table = 'control_mappings';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], ControlMapping.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ControlMapping.prototype, "sourceControlId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ControlMapping.prototype, "targetControlId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ControlMapping.prototype, "mappingType", void 0);
__decorate([
    belongsTo(() => Control, { foreignKey: 'sourceControlId' }),
    __metadata("design:type", Object)
], ControlMapping.prototype, "sourceControl", void 0);
__decorate([
    belongsTo(() => Control, { foreignKey: 'targetControlId' }),
    __metadata("design:type", Object)
], ControlMapping.prototype, "targetControl", void 0);
//# sourceMappingURL=control_mapping.js.map