export default class AuthMiddleware {
    async handle(ctx, next) {
        await ctx.auth.authenticate();
        await next();
    }
}
//# sourceMappingURL=auth_middleware.js.map