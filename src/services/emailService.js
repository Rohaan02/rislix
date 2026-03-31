import { transporter } from "../config/mailer.js";
import { responseEmailTemplate } from "./emailTemplate/responseEmail.js";

export const sendEmail = async (data) => {
  const { name, email, phone, message } = data;

  // Admin Email (to you)
  await transporter.sendMail({
    from: `"Rislix Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `📩 New Lead from Rislix - ${name}`,
    html: responseEmailTemplate({ name, email, phone, message }),
  });

  // Auto Reply to User
  await transporter.sendMail({
    from: `"Rislix Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thanks for contacting Rislix 🚀",
    html: `
      <div style="font-family:sans-serif; padding:20px;">
        <h2 style="color:#16a34a;">Hi ${name},</h2>
        <p>Thanks for reaching out to <strong>Rislix</strong>. We’ve received your message and will get back to you within 24 hours.</p>
        <p style="margin-top:20px;">Best Regards,<br/>Rislix Team</p>
      </div>
    `,
  });
};
