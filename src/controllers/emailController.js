import { validationResult } from "express-validator";
import { sendEmail } from "../services/emailService.js";

export const handleEmail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    await sendEmail(req.body);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
