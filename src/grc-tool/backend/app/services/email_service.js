import { ConfidentialClientApplication } from '@azure/msal-node';
import adminTemplate from './email_templates/admin_template.js';
import userTemplate from './email_templates/user_template.js';
async function getAccessToken() {
    const cca = new ConfidentialClientApplication({
        auth: {
            clientId: process.env.CLIENT_ID,
            authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
            clientSecret: process.env.CLIENT_SECRET,
        },
    });
    const result = await cca.acquireTokenByClientCredential({
        scopes: ['https://graph.microsoft.com/.default'],
    });
    return result.accessToken;
}
async function sendMail({ to, subject, html }) {
    const token = await getAccessToken();
    const res = await fetch(`https://graph.microsoft.com/v1.0/users/${process.env.EMAIL_USER}/sendMail`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: {
                subject,
                body: { contentType: 'HTML', content: html },
                toRecipients: [{ emailAddress: { address: to } }],
            },
        }),
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Graph API error: ${err}`);
    }
}
export async function sendEmails(data) {
    const { name, email, phone, message } = data;
    await sendMail({
        to: process.env.EMAIL_USER,
        subject: 'New Lead from Rislix Contact Form',
        html: adminTemplate({ name, email, phone, message }),
    });
    await sendMail({
        to: email,
        subject: 'We received your message - Rislix',
        html: userTemplate({ name, message }),
    });
}
//# sourceMappingURL=email_service.js.map