const TENANT_KEY = Symbol.for('rislix.tenantId');
export function resolveTenantId(user, queryTenantId) {
    if (user.role?.name === 'super_admin' && queryTenantId) {
        return Number(queryTenantId);
    }
    return user.tenantId;
}
export function isSuperAdmin(user) {
    return user.role?.name === 'super_admin';
}
export function setRequestTenantId(ctx, tenantId) {
    ;
    ctx[TENANT_KEY] = tenantId;
}
export function getRequestTenantId(ctx) {
    return ctx[TENANT_KEY] ?? null;
}
export function requireTenantId(ctx) {
    return getRequestTenantId(ctx);
}
//# sourceMappingURL=tenant_scope.js.map