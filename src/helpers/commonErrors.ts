import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { codeInstance } from "./codeInstanceID";
import { ErrorException } from "./errorException";

const APP_INSTANCE_ID = codeInstance.getInstance();

export const getInternalServerTmfError = (
  message = "An unexpected error occurred"
): ErrorException => {
  return new ErrorException(
    APP_INSTANCE_ID,
    ReasonPhrases.INTERNAL_SERVER_ERROR,
    message,
    StatusCodes.INTERNAL_SERVER_ERROR.toString()
  );
};

export const getBadRequestError = (
  message: string = ReasonPhrases.BAD_REQUEST
): ErrorException => {
  return new ErrorException(
    APP_INSTANCE_ID,
    ReasonPhrases.BAD_REQUEST,
    message,
    StatusCodes.BAD_REQUEST.toString()
  );
};
export const getUnAuthorizedError = (
  message: string = ReasonPhrases.UNAUTHORIZED
): ErrorException => {
  return new ErrorException(
    APP_INSTANCE_ID,
    ReasonPhrases.UNAUTHORIZED,
    message,
    StatusCodes.UNAUTHORIZED.toString()
  );
};

export const getForbiddenError = (
  message: string = ReasonPhrases.FORBIDDEN
): ErrorException => {
  return new ErrorException(
    APP_INSTANCE_ID,
    ReasonPhrases.FORBIDDEN,
    message,
    StatusCodes.FORBIDDEN.toString()
  );
};

export const getNotFoundTmfError = (
  message: string = ReasonPhrases.NOT_FOUND
): ErrorException => {
  return new ErrorException(
    APP_INSTANCE_ID,
    ReasonPhrases.NOT_FOUND,
    message,
    StatusCodes.NOT_FOUND.toString()
  );
};
