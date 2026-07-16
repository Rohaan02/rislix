import vine from '@vinejs/vine';
export const createRoleValidator = vine.compile(vine.object({
    name: vine
        .string()
        .trim()
        .toLowerCase()
        .minLength(2)
        .maxLength(50)
        .regex(/^[a-z_]+$/),
    displayName: vine.string().trim().minLength(2).maxLength(100),
    description: vine.string().trim().maxLength(255).optional(),
    permissionIds: vine.array(vine.number()).optional(),
}));
export const updateRoleValidator = vine.compile(vine.object({
    displayName: vine.string().trim().minLength(2).maxLength(100).optional(),
    description: vine.string().trim().maxLength(255).optional(),
    permissionIds: vine.array(vine.number()).optional(),
}));
export const assignRoleValidator = vine.compile(vine.object({
    roleId: vine.number(),
}));
//# sourceMappingURL=role_validator.js.map