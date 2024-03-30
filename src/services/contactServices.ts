import { Contact, ContactBody, ContactResponse } from "../models/contactType";
import { codeInstance } from "../helpers/codeInstanceID";
import { ErrorException } from "../helpers/errorException";
import { getInternalServerTmfError } from "../helpers/commonErrors";
import { getContactsFromDB } from "../repositories/getContacts";
import {
  createContactResponse,
  createPrimaryContact,
  verifyAndCreateSecondaryContact,
} from "../helpers/contactHelper";

const APP_INSTANCE_ID = codeInstance.getInstance();

const fileName = "ContactService";

export class ContactService {
  public async identifyContacts(
    contactBody: ContactBody
  ): Promise<ContactResponse> {
    try {
      contactBody.email = contactBody.email ? contactBody.email : null;
      contactBody.phoneNumber = contactBody.phoneNumber
        ? contactBody.phoneNumber
        : null;
      // case 1: get contacts
      let contactArray: Contact[] = await getContactsFromDB(contactBody);
      if (contactArray.length === 0) {
        // create new contact
        createPrimaryContact(contactBody);
      } else {
        verifyAndCreateSecondaryContact(contactArray, contactBody);
      }
      // get contacts and trasform to response
      contactArray = await getContactsFromDB(contactBody);
      return createContactResponse(contactArray);
    } catch (error: any) {
      if (error instanceof ErrorException) throw error;
      console.error(
        `${APP_INSTANCE_ID}: ${fileName} -> Error while identifying contacts: ${error}`
      );

      throw getInternalServerTmfError(error.message);
    }
  }
}

export const contactService = new ContactService();
