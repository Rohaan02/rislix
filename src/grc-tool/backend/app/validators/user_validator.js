import vine from '@vinejs/vine';
export const updateUserValidator = vine.compile(vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100).optional(),
    email: vine.string().email().normalizeEmail().optional(),
    roleId: vine.number().optional(),
    status: vine.enum(['active', 'inactive']).optional(),
}));
export const inviteUserValidator = vine.compile(vine.object({
    email: vine.string().email().normalizeEmail(),
    roleId: vine.number().optional(),
}));
export const changePasswordValidator = vine.compile(vine.object({
    currentPassword: vine.string().minLength(1),
    newPassword: vine
        .string()
        .minLength(8)
        .maxLength(64)
        .confirmed({ confirmationField: 'newPasswordConfirmation' }),
}));
export const updateProfileValidator = vine.compile(vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100).optional(),
    email: vine.string().email().normalizeEmail().optional(),
}));
export const acceptInviteValidator = vine.compile(vine.object({
    token: vine.string(),
    fullName: vine.string().trim().minLength(2).maxLength(100),
    password: vine
        .string()
        .minLength(8)
        .maxLength(64)
        .confirmed({ confirmationField: 'passwordConfirmation' }),
}));
//# sourceMappingURL=user_validator.js.map