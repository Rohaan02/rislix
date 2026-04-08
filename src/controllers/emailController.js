import { sendEmails } from "../services/emailService.js";

export const sendEmailController = async (req, res) => {
  try {
    await sendEmails(req.body);

    res.json({
      success: true,
      message: "Emails sent successfully 🚀",
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
