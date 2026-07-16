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
import User from '#models/user';
import Tenant from '#models/tenant';
export default class ActivityLog extends BaseModel {
    static table = 'activity_logs';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], ActivityLog.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ActivityLog.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ActivityLog.prototype, "userId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ActivityLog.prototype, "action", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ActivityLog.prototype, "entityType", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ActivityLog.prototype, "entityId", void 0);
__decorate([
    column({
        prepare: (value) => (value ? JSON.stringify(value) : null),
        consume: (value) => (value ? JSON.parse(value) : null),
    }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "metadata", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ActivityLog.prototype, "ipAddress", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], ActivityLog.prototype, "createdAt", void 0);
__decorate([
    belongsTo(() => User),
    __metadata("design:type", Object)
], ActivityLog.prototype, "user", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], ActivityLog.prototype, "tenant", void 0);
//# sourceMappingURL=activity_log.js.map