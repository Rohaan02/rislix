import { DateTime } from 'luxon';
import Task from '#models/task';
import TaskComment from '#models/task_comment';
import TaskAttachment from '#models/task_attachment';
import { storeUploadedFile } from '#services/file_storage';
import { logActivity } from '#services/activity_logger';
import { getRequestTenantId } from '#helpers/tenant_scope';
export default class TasksController {
    async index(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response } = ctx;
        const { page = 1, perPage = 20, status, priority, ownerId } = request.qs();
        const query = Task.query()
            .where('tenant_id', tenantId)
            .preload('owner', (q) => q.select('id', 'full_name', 'email'))
            .orderBy('due_date', 'asc');
        if (status)
            query.where('status', status);
        if (priority)
            query.where('priority', priority);
        if (ownerId)
            query.where('owner_id', ownerId);
        const tasks = await query.paginate(Number(page), Number(perPage));
        return response.ok(tasks);
    }
    async show(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const task = await Task.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .preload('owner')
            .preload('comments', (q) => q.preload('user').orderBy('created_at', 'asc'))
            .preload('attachments')
            .firstOrFail();
        return response.ok(task);
    }
    async store(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { request, response, auth } = ctx;
        const payload = request.only([
            'title', 'description', 'sourceType', 'sourceId', 'ownerId', 'priority', 'status', 'dueDate',
        ]);
        const task = await Task.create({
            tenantId: tenantId,
            title: payload.title,
            description: payload.description ?? null,
            sourceType: payload.sourceType ?? 'manual',
            sourceId: payload.sourceId ?? null,
            ownerId: payload.ownerId ?? null,
            priority: payload.priority ?? 'medium',
            status: payload.status ?? 'open',
            dueDate: payload.dueDate ?? null,
            createdBy: auth.user.id,
        });
        await logActivity({ ctx, action: 'created', entityType: 'Task', entityId: task.id });
        return response.created(task);
    }
    async update(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response, auth } = ctx;
        const task = await Task.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const payload = request.only([
            'title', 'description', 'ownerId', 'priority', 'status', 'dueDate',
        ]);
        task.merge({
            title: payload.title ?? task.title,
            description: payload.description ?? task.description,
            ownerId: payload.ownerId ?? task.ownerId,
            priority: payload.priority ?? task.priority,
            status: payload.status ?? task.status,
            dueDate: payload.dueDate ?? task.dueDate,
            updatedBy: auth.user.id,
        });
        await task.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Task', entityId: task.id });
        return response.ok(task);
    }
    async destroy(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response } = ctx;
        const task = await Task.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        await task.delete();
        await logActivity({ ctx, action: 'deleted', entityType: 'Task', entityId: task.id });
        return response.ok({ message: 'Task deleted.' });
    }
    async complete(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, response, auth } = ctx;
        const task = await Task.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        task.status = 'completed';
        task.completedAt = DateTime.now();
        task.updatedBy = auth.user.id;
        await task.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Task', entityId: task.id, metadata: { completed: true } });
        return response.ok(task);
    }
    async escalate(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response, auth } = ctx;
        const task = await Task.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { escalatedTo, escalationNote } = request.only(['escalatedTo', 'escalationNote']);
        task.escalatedTo = escalatedTo ?? null;
        task.escalationNote = escalationNote ?? null;
        task.escalatedAt = DateTime.now();
        task.updatedBy = auth.user.id;
        await task.save();
        await logActivity({ ctx, action: 'updated', entityType: 'Task', entityId: task.id, metadata: { escalatedTo } });
        return response.ok(task);
    }
    async addComment(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response, auth } = ctx;
        const task = await Task.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const { body } = request.only(['body']);
        const comment = await TaskComment.create({
            taskId: task.id,
            userId: auth.user.id,
            body,
        });
        await comment.load('user');
        await logActivity({ ctx, action: 'created', entityType: 'TaskComment', entityId: comment.id });
        return response.created(comment);
    }
    async addAttachment(ctx) {
        const tenantId = getRequestTenantId(ctx);
        const { params, request, response, auth } = ctx;
        const task = await Task.query()
            .where('id', params.id)
            .where('tenant_id', tenantId)
            .firstOrFail();
        const file = request.file('file', { size: '20mb' });
        if (!file)
            return response.badRequest({ message: 'No file uploaded.' });
        const fileUrl = await storeUploadedFile(file, `tasks/${tenantId}`);
        const attachment = await TaskAttachment.create({
            taskId: task.id,
            fileUrl,
            fileName: file.clientName,
            uploadedBy: auth.user.id,
        });
        await logActivity({ ctx, action: 'created', entityType: 'TaskAttachment', entityId: attachment.id });
        return response.created(attachment);
    }
}
//# sourceMappingURL=tasks_controller.js.map