import { resolveTenantId, setRequestTenantId } from '#helpers/tenant_scope';
export default class TenantMiddleware {
    async handle(ctx, next) {
        const user = ctx.auth.user;
        await user.load('role');
        const tenantId = resolveTenantId(user, ctx.request.qs().tenantId);
        if (!tenantId && user.role?.name !== 'super_admin') {
            return ctx.response.forbidden({
                message: 'Tenant context is required for this request.',
            });
        }
        setRequestTenantId(ctx, tenantId);
        await next();
    }
}
//# sourceMappingURL=tenant_middleware.js.map