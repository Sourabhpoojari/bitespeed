import { Router } from "express";
import { body } from "express-validator";
import { contactController } from "../controllers/contactController";

const router = Router();

router.post(
  "/identify",
  body("email").optional().isEmail().withMessage("Invalid email address"),
  contactController.getContacts
);

module.exports = router;
