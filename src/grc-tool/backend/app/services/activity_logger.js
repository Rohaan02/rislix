import ActivityLog from '#models/activity_log';
export async function logActivity({ ctx, action, entityType, entityId = null, metadata = null, user: explicitUser = null, }) {
    const user = explicitUser ?? ctx.auth?.user ?? null;
    try {
        await ActivityLog.create({
            tenantId: user?.tenantId ?? null,
            userId: user?.id ?? null,
            action,
            entityType,
            entityId,
            metadata,
            ipAddress: ctx.request.ip(),
        });
    }
    catch {
    }
}
//# sourceMappingURL=activity_logger.js.map