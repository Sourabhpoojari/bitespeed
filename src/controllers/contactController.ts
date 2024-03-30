import { ErrorException } from "../helpers/errorException";
import { codeInstance } from "../helpers/codeInstanceID";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getInternalServerTmfError } from "../helpers/commonErrors";
import { bodyValidation } from "../helpers/reqBodyValidation";
import { contactService } from "../services/contactServices";

const APP_INSTANCE_ID = codeInstance.getInstance();

const fileName = "ContactController";

export class ContactController {
  public async getContacts(req: Request, res: Response): Promise<any> {
    try {
      console.info(
        `${APP_INSTANCE_ID}: ${fileName} -> Got identify Contacts request!`
      );
      bodyValidation(req);

      // identify the contacts
      const { email, phoneNumber } = req.body;
      const contacts = await contactService.identifyContacts({
        email,
        phoneNumber,
      });

      return res.status(StatusCodes.OK).json({ contact: contacts });
    } catch (error) {
      if (error instanceof ErrorException)
        return res.status(parseInt(error.status)).send(error);

      console.error(`${APP_INSTANCE_ID}: ${fileName} -> Error: ${error}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getInternalServerTmfError(error as any));
    }
  }
}

export const contactController = new ContactController();
