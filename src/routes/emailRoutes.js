import express from "express";
const router = express.Router();

import { sendEmailController } from "../controllers/emailController.js";
import { validateEmail } from "../validators/emailValidator.js";

router.post("/send-email", validateEmail, sendEmailController);

export default router;
