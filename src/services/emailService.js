import axios from "axios";
import { getAccessToken } from "../config/msalConfig.js";

// Admin notification email template
const adminTemplate = ({ name, email, phone, message }) => `
  <div style="font-family: Arial; padding:20px;">
    <h2 style="color:#16a34a;">🚀 New Lead from Rislix Website</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong></p>
    <div style="background:#f9f9f9;padding:10px;border-radius:6px;">
      ${message}
    </div>
  </div>
`;

// User confirmation template
const userTemplate = ({ name, message }) => `
  <div style="font-family: Arial; padding:20px;">
    <h2 style="color:#16a34a;">Thank you for contacting Rislix 💚</h2>
    <p>Hi ${name},</p>
    <p>We’ve received your message. Our team will get back to you shortly.</p>

    <h4>Your Message:</h4>
    <div style="background:#f1f5f9;padding:10px;border-radius:6px;">
      ${message}
    </div>

    <p style="margin-top:20px;">Best Regards,<br/>Rislix Team</p>
  </div>
`;

export const sendMail = async ({ to, subject, html }) => {
  const token = await getAccessToken();

  await axios.post(
    `https://graph.microsoft.com/v1.0/users/${process.env.EMAIL_USER}/sendMail`,
    {
      message: {
        subject,
        body: {
          contentType: "HTML",
          content: html,
        },
        toRecipients: [
          {
            emailAddress: { address: to },
          },
        ],
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
};

export const sendEmails = async (data) => {
  const { name, email, phone, message } = data;

  await sendMail({
    to: process.env.EMAIL_USER,
    subject: "New Lead from Rislix Contact Form",
    html: adminTemplate(data),
  });

  await sendMail({
    to: email,
    subject: "We received your message - Rislix",
    html: userTemplate({ name, message }),
  });
};
