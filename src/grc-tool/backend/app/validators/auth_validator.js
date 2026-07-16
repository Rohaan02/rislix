import vine from '@vinejs/vine';
export const registerValidator = vine.compile(vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    email: vine.string().email().normalizeEmail(),
    password: vine
        .string()
        .minLength(8)
        .maxLength(64)
        .confirmed({ confirmationField: 'passwordConfirmation' }),
}));
export const loginValidator = vine.compile(vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(1),
}));
//# sourceMappingURL=auth_validator.js.map