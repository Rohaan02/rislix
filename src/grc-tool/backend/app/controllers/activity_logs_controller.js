import ActivityLog from '#models/activity_log';
import { resolveTenantId } from '#helpers/tenant_scope';
export default class ActivityLogsController {
    async index(ctx) {
        const { auth, request, response } = ctx;
        const user = auth.user;
        await user.load('role');
        if (user.role?.name !== 'super_admin') {
            return response.forbidden({ message: 'Activity logs are restricted to super admins.' });
        }
        const tenantId = resolveTenantId(user, request.qs().tenantId);
        const { page = 1, perPage = 50, entityType, action, userId, } = request.qs();
        const query = ActivityLog.query()
            .preload('user', (q) => q.select('id', 'full_name', 'email'))
            .preload('tenant', (q) => q.select('id', 'name', 'slug'))
            .orderBy('created_at', 'desc');
        if (tenantId)
            query.where('tenant_id', tenantId);
        if (entityType)
            query.where('entity_type', entityType);
        if (action)
            query.where('action', action);
        if (userId)
            query.where('user_id', userId);
        const logs = await query.paginate(Number(page), Number(perPage));
        return response.ok(logs);
    }
}
//# sourceMappingURL=activity_logs_controller.js.map