import { DateTime } from 'luxon';
import Framework from '#models/framework';
import Control from '#models/control';
import TenantFramework from '#models/tenant_framework';
import TenantControl from '#models/tenant_control';
import { logActivity } from '#services/activity_logger';
export default class FrameworksController {
    async index({ response }) {
        const frameworks = await Framework.query()
            .withCount('controls')
            .orderBy('name', 'asc');
        return response.ok(frameworks);
    }
    async show({ params, response }) {
        const framework = await Framework.query()
            .where('id', params.id)
            .withCount('controls')
            .firstOrFail();
        return response.ok(framework);
    }
    async store(ctx) {
        const { request, response } = ctx;
        const { name, version, description, status } = request.only(['name', 'version', 'description', 'status']);
        const framework = await Framework.create({
            name,
            version: version ?? null,
            description: description ?? null,
            status: status ?? 'active',
        });
        await logActivity({ ctx, action: 'created', entityType: 'Framework', entityId: framework.id });
        return response.created(framework);
    }
    async controls({ params, response }) {
        const controls = await Control.query()
            .where('framework_id', params.id)
            .orderBy('control_code', 'asc');
        return response.ok(controls);
    }
    async assignToTenant(ctx) {
        const { params, response } = ctx;
        const tenantId = Number(params.tenantId);
        const frameworkId = Number(params.frameworkId);
        const framework = await Framework.findOrFail(frameworkId);
        const existing = await TenantFramework.query()
            .where('tenant_id', tenantId)
            .where('framework_id', frameworkId)
            .first();
        if (existing) {
            return response.conflict({ message: 'Framework already assigned to tenant.' });
        }
        await TenantFramework.create({
            tenantId,
            frameworkId,
            enabledAt: DateTime.now(),
        });
        const controls = await Control.query().where('framework_id', frameworkId);
        for (const control of controls) {
            await TenantControl.firstOrCreate({ tenantId, controlId: control.id }, { tenantId, controlId: control.id, status: 'not_started', applicability: true });
        }
        await logActivity({
            ctx,
            action: 'created',
            entityType: 'TenantFramework',
            entityId: frameworkId,
            metadata: { tenantId },
        });
        return response.created({
            message: `Framework "${framework.name}" assigned to tenant.`,
            controlsProvisioned: controls.length,
        });
    }
}
//# sourceMappingURL=frameworks_controller.js.map