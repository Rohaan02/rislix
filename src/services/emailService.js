import axios from "axios";
import { getAccessToken } from "../config/msalConfig.js";
import adminTemplate from "./emailTemplate/adminTemplate.js";
import userTemplate from "./emailTemplate/userTemplate.js";

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

  // Admin Notification
  await sendMail({
    // to: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Lead from Rislix Contact Form",
    html: adminTemplate(data),
  });

  // User Confirmation
  await sendMail({
    to: email,
    subject: "We received your message - Rislix",
    html: userTemplate({ name, message }),
  });
};
