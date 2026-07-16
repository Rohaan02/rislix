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
import Task from '#models/task';
import User from '#models/user';
export default class TaskAttachment extends BaseModel {
    static table = 'task_attachments';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], TaskAttachment.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], TaskAttachment.prototype, "taskId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], TaskAttachment.prototype, "fileUrl", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], TaskAttachment.prototype, "fileName", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], TaskAttachment.prototype, "uploadedBy", void 0);
__decorate([
    column.dateTime({ autoCreate: true, columnName: 'created_at' }),
    __metadata("design:type", DateTime)
], TaskAttachment.prototype, "createdAt", void 0);
__decorate([
    belongsTo(() => Task),
    __metadata("design:type", Object)
], TaskAttachment.prototype, "task", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'uploadedBy' }),
    __metadata("design:type", Object)
], TaskAttachment.prototype, "uploader", void 0);
//# sourceMappingURL=task_attachment.js.map