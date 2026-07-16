import vine from '@vinejs/vine';
const STATUSES = ['active', 'paused', 'completed'];
const PLANS = ['trial', 'starter', 'professional', 'enterprise'];
export const createTenantValidator = vine.compile(vine.object({
    name: vine.string().trim().minLength(2).maxLength(150),
    slug: vine
        .string()
        .trim()
        .toLowerCase()
        .minLength(2)
        .maxLength(100)
        .regex(/^[a-z0-9-]+$/),
    industry: vine.string().trim().maxLength(100).optional(),
    country: vine.string().trim().maxLength(100).optional(),
    website: vine.string().url().optional(),
    status: vine.enum(STATUSES).optional(),
    subscriptionPlan: vine.enum(PLANS).optional(),
}));
export const updateTenantValidator = vine.compile(vine.object({
    name: vine.string().trim().minLength(2).maxLength(150).optional(),
    industry: vine.string().trim().maxLength(100).optional(),
    country: vine.string().trim().maxLength(100).optional(),
    website: vine.string().url().optional(),
    status: vine.enum(STATUSES).optional(),
    subscriptionPlan: vine.enum(PLANS).optional(),
}));
//# sourceMappingURL=tenant_validator.js.map