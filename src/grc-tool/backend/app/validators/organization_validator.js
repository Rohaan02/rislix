import vine from '@vinejs/vine';
export const createOrgValidator = vine.compile(vine.object({
    name: vine.string().trim().minLength(2).maxLength(150),
    slug: vine
        .string()
        .trim()
        .toLowerCase()
        .minLength(2)
        .maxLength(100)
        .regex(/^[a-z0-9-]+$/),
    industry: vine.string().trim().maxLength(100).optional(),
    website: vine.string().url().optional(),
}));
export const updateOrgValidator = vine.compile(vine.object({
    name: vine.string().trim().minLength(2).maxLength(150).optional(),
    industry: vine.string().trim().maxLength(100).optional(),
    website: vine.string().url().optional(),
    isActive: vine.boolean().optional(),
}));
//# sourceMappingURL=organization_validator.js.map