import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { ErrorType } from "../models/errorType";

import { v4 as uuid } from "uuid";
export class ErrorException extends Error implements ErrorType {
  public code = "";
  public reason = "";
  public message = "";
  public status = "";

  /*
  Note: since lots of these parameters is optional parameters, the developer will have to set all previous parameters
  as an empty string to, for example, be able to assign the @type, so to prevent empty string assignation, I decided
  to check it the parameters is not undefined and if the parameter is not an empty string
  */
  constructor(
    code: string | ErrorType,
    reason?: string,
    message?: string,
    // Adding new parameters
    status?: string
  ) {
    super();
    if (typeof code === "string") {
      Object.setPrototypeOf(this, new.target.prototype);
      // add UUID for code
      if (
        code.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        )
      ) {
        this.code = code;
      } else {
        this.code = uuid();
      }
      if (reason) this.reason = reason;
      // Adding new parameters
      if (status && !isNaN(Number(status)) && status in StatusCodes) {
        this.status = status;
      } else {
        if (!isNaN(Number(code)) && code in StatusCodes) {
          this.status = code;
        } else {
          this.status = "500";
        }
      }
      if (message) this.message = message;
      else this.message = getReasonPhrase(Number(this.status));
    } else {
      let tmfError: ErrorType = code;
      if (
        tmfError.code.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        )
      ) {
        this.code = tmfError.code;
      } else {
        this.code = uuid();
      }
      if (tmfError.reason) this.reason = tmfError.reason;
      if (
        tmfError.status &&
        !isNaN(Number(tmfError.status)) &&
        tmfError.status in StatusCodes
      ) {
        this.status = tmfError.status;
      } else {
        if (!isNaN(Number(tmfError.code)) && tmfError.code in StatusCodes) {
          this.status = tmfError.code;
        } else {
          this.status = "500";
        }
      }
      if (tmfError.message) this.message = tmfError.message;
      else this.message = getReasonPhrase(Number(this.status));
    }
  }
}
