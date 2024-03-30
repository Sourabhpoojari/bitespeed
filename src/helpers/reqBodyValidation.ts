import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { getBadRequestError } from "./commonErrors";
import { codeInstance } from "./codeInstanceID";

const fileName = "reqBodyValidationHelper";
const APP_INSTANCE_ID = codeInstance.getInstance();

export const bodyValidation = (req: Request): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((error) => error.msg)
      .join(", ");
    console.error(
      `${APP_INSTANCE_ID}: ${fileName} -> Validation Error: ${message}`
    );
    throw getBadRequestError(message);
  }
  const { email, phoneNumber } = req.body;
  if (!email && !phoneNumber) {
    // throw an error if no email or phone number is provided
    const message = "Either an email or a phone number is required";
    console.error(
      `${APP_INSTANCE_ID}: ${fileName} -> Validation Error: ${message}`
    );
    throw getBadRequestError(message);
  }
};
