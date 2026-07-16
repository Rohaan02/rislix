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
import Tenant from '#models/tenant';
import Role from '#models/role';
import User from '#models/user';
export default class UserInvite extends BaseModel {
    get isExpired() {
        return this.expiresAt < DateTime.now();
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], UserInvite.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], UserInvite.prototype, "email", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], UserInvite.prototype, "token", void 0);
__decorate([
    column({ columnName: 'tenant_id' }),
    __metadata("design:type", Number)
], UserInvite.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], UserInvite.prototype, "roleId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], UserInvite.prototype, "invitedBy", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], UserInvite.prototype, "isAccepted", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], UserInvite.prototype, "expiresAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], UserInvite.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], UserInvite.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], UserInvite.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => Role),
    __metadata("design:type", Object)
], UserInvite.prototype, "role", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'invitedBy' }),
    __metadata("design:type", Object)
], UserInvite.prototype, "inviter", void 0);
//# sourceMappingURL=user_invite.js.map