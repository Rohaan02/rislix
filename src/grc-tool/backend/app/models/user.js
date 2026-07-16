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
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
import Role from '#models/role';
import Tenant from '#models/tenant';
import Department from '#models/department';
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
});
export default class User extends compose(BaseModel, AuthFinder) {
    static accessTokens = DbAccessTokensProvider.forModel(User);
    async hasPermission(permissionName) {
        if (!this.roleId)
            return false;
        await this.load('role', (q) => q.preload('permissions'));
        return this.role?.permissions?.some((p) => p.name === permissionName) ?? false;
    }
    async isSuperAdmin() {
        await this.load('role');
        return this.role?.name === 'super_admin';
    }
    toSafeJSON() {
        return {
            id: this.id,
            fullName: this.fullName,
            email: this.email,
            status: this.status,
            tenantId: this.tenantId,
            departmentId: this.departmentId,
            roleId: this.roleId,
            mfaEnabled: this.mfaEnabled,
            lastLogin: this.lastLogin,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], User.prototype, "fullName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    column({ serializeAs: null }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], User.prototype, "roleId", void 0);
__decorate([
    column({ columnName: 'tenant_id' }),
    __metadata("design:type", Object)
], User.prototype, "tenantId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], User.prototype, "departmentId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], User.prototype, "lastLogin", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], User.prototype, "mfaEnabled", void 0);
__decorate([
    column({ serializeAs: null }),
    __metadata("design:type", Object)
], User.prototype, "mfaSecret", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], User.prototype, "updatedBy", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], User.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Role),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
__decorate([
    belongsTo(() => Tenant),
    __metadata("design:type", Object)
], User.prototype, "tenant", void 0);
__decorate([
    belongsTo(() => Department),
    __metadata("design:type", Object)
], User.prototype, "department", void 0);
//# sourceMappingURL=user.js.map