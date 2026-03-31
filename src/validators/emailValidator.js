import { body } from "express-validator";

export const emailValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("message").optional().isLength({ max: 1000 }),
];
