import vine from '@vinejs/vine';
import { sendEmails } from '#services/email_service';
const contactValidator = vine.compile(vine.object({
    name: vine.string().trim().minLength(1),
    email: vine.string().email(),
    phone: vine.string().trim().minLength(1),
    message: vine.string().trim().minLength(1),
}));
export default class ContactController {
    async send(ctx) {
        const payload = await ctx.request.validateUsing(contactValidator);
        await sendEmails(payload);
        return ctx.response.ok({ success: true, message: 'Emails sent successfully' });
    }
}
//# sourceMappingURL=contact_controller.js.map