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
import TaskComment from '#models/task_comment';
import TaskAttachment from '#models/task_attachment';
export default class Task extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Task.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Task.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Task.prototype, "sourceType", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Task.prototype, "sourceId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Task.prototype, "ownerId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Task.prototype, "priority", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], Task.prototype, "dueDate", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Task.prototype, "completedAt", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Task.prototype, "escalatedTo", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Task.prototype, "escalatedAt", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Task.prototype, "escalationNote", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Task.prototype, "createdBy", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Task.prototype, "updatedBy", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Task.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], Task.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], Task.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'ownerId' }),
    __metadata("design:type", Object)
], Task.prototype, "owner", void 0);
__decorate([
    hasMany(() => TaskComment),
    __metadata("design:type", Object)
], Task.prototype, "comments", void 0);
__decorate([
    hasMany(() => TaskAttachment),
    __metadata("design:type", Object)
], Task.prototype, "attachments", void 0);
//# sourceMappingURL=task.js.map