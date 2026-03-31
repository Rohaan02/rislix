import express from "express";
import { handleEmail } from "../controllers/emailController.js";
import { emailValidator } from "../validators/emailValidator.js";

const router = express.Router();

router.post("/contact", emailValidator, handleEmail);

export default router;
