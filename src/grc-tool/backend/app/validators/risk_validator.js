import vine from '@vinejs/vine';
const CATEGORIES = [
    'strategic', 'operational', 'financial', 'compliance',
    'reputational', 'technical', 'physical', 'other',
    'people', 'process', 'technology', 'ai_risk',
];
const STATUSES = ['open', 'in_treatment', 'accepted', 'closed'];
export const createRiskValidator = vine.compile(vine.object({
    title: vine.string().trim().minLength(3).maxLength(200),
    description: vine.string().trim().maxLength(2000).optional(),
    category: vine.enum(CATEGORIES),
    likelihood: vine.number().min(1).max(3),
    impact: vine.number().min(1).max(3),
    status: vine.enum(STATUSES).optional(),
    treatment: vine.string().trim().maxLength(2000).optional(),
    ownerId: vine.number().optional(),
    reviewDate: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
}));
export const updateRiskValidator = vine.compile(vine.object({
    title: vine.string().trim().minLength(3).maxLength(200).optional(),
    description: vine.string().trim().maxLength(2000).optional(),
    category: vine.enum(CATEGORIES).optional(),
    likelihood: vine.number().min(1).max(3).optional(),
    impact: vine.number().min(1).max(3).optional(),
    status: vine.enum(STATUSES).optional(),
    treatment: vine.string().trim().maxLength(2000).optional(),
    ownerId: vine.number().optional(),
    reviewDate: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
}));
//# sourceMappingURL=risk_validator.js.map