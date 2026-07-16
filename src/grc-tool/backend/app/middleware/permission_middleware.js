export default class PermissionMiddleware {
    async handle({ auth, response }, next, options) {
        const user = auth.user;
        for (const permission of options.permissions) {
            const allowed = await user.hasPermission(permission);
            if (!allowed) {
                return response.forbidden({
                    message: `Access denied. Required permission: ${permission}`,
                });
            }
        }
        await next();
    }
}
//# sourceMappingURL=permission_middleware.js.map