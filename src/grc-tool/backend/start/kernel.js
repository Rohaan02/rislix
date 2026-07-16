import router from '@adonisjs/core/services/router';
import server from '@adonisjs/core/services/server';
server.use([
    () => import('@adonisjs/core/bodyparser_middleware'),
    () => import('@adonisjs/cors/cors_middleware'),
]);
router.use([() => import('@adonisjs/auth/initialize_auth_middleware')]);
export const middleware = router.named({
    auth: () => import('#middleware/auth_middleware'),
    permission: () => import('#middleware/permission_middleware'),
    tenant: () => import('#middleware/tenant_middleware'),
    rateLimit: () => import('#middleware/rate_limit_middleware'),
});
//# sourceMappingURL=kernel.js.map