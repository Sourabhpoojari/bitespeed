import { createContact } from "../repositories/createContact";
import {
  Contact,
  ContactBody,
  ContactResponse,
  UpdateContactParams,
  linkPrecedence,
} from "../models/contactType";
import { codeInstance } from "./codeInstanceID";
import { getInternalServerTmfError } from "./commonErrors";
import { ErrorException } from "./errorException";
import { updateContact } from "../repositories/updateContact";

const fileName = "ContactHelper";
const APP_INSTANCE_ID = codeInstance.getInstance();

export const createPrimaryContact = async (contactBody: ContactBody) => {
  try {
    console.info(
      `${APP_INSTANCE_ID}: ${fileName} -> Creating primary contact for: ${JSON.stringify(
        contactBody
      )}`
    );
    // create contact object
    const contact: Contact = {
      phoneNumber: contactBody.phoneNumber,
      email: contactBody.email,
      linkedId: null,
      linkPrecedence: linkPrecedence.primary,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    await createContact(contact);
  } catch (error: any) {
    if (error instanceof ErrorException) throw error;
    console.error(
      `${APP_INSTANCE_ID}: ${fileName} -> Error while Creating Primay Contact: ${error}`
    );

    throw getInternalServerTmfError(error.message);
  }
};

export const createSecondaryContact = async (
  contactBody: ContactBody,
  primaryContact: Contact
) => {
  try {
    console.info(
      `${APP_INSTANCE_ID}: ${fileName} -> Creating secondary contact for: ${JSON.stringify(
        contactBody
      )}`
    );

    // create secondary contact object
    const secondaryContact: Contact = {
      phoneNumber: contactBody.phoneNumber,
      email: contactBody.email,
      linkedId: primaryContact.id,
      linkPrecedence: linkPrecedence.secondary,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    await createContact(secondaryContact);
  } catch (error: any) {
    if (error instanceof ErrorException) throw error;
    console.error(
      `${APP_INSTANCE_ID}: ${fileName} -> Error while Creating Secondary Contact: ${error}`
    );

    throw getInternalServerTmfError(error.message);
  }
};

export const createContactResponse = (
  contactArray: Contact[]
): ContactResponse => {
  try {
    console.info(
      `${APP_INSTANCE_ID}: ${fileName} -> Creating Contact Response Object`
    );
    let contactResponse: ContactResponse = {
      primaryContactId: 0,
      emails: [],
      phoneNumbers: [],
      secondaryContactIds: [],
    };

    contactArray.forEach((contact: Contact) => {
      if (contact.linkPrecedence === linkPrecedence.primary) {
        contactResponse.primaryContactId = contact.id!;
      } else {
        contactResponse.primaryContactId = contact.linkedId!;
        contactResponse.secondaryContactIds.push(contact.id!);
      }
      if (contact.email && !contactResponse.emails.includes(contact.email)) {
        contactResponse.emails.push(contact.email);
      }
      if (
        contact.phoneNumber &&
        !contactResponse.phoneNumbers.includes(contact.phoneNumber)
      ) {
        contactResponse.phoneNumbers.push(contact.phoneNumber);
      }
    });

    return contactResponse!;
  } catch (error: any) {
    if (error instanceof ErrorException) throw error;
    console.error(
      `${APP_INSTANCE_ID}: ${fileName} -> Error while Creating Contact Response Object: ${error}`
    );

    throw getInternalServerTmfError(error.message);
  }
};

export const verifyAndCreateSecondaryContact = async (
  contactArray: Contact[],
  contactBody: ContactBody
) => {
  try {
    const primaryContacts: Contact[] = contactArray.filter(
      (contact) => contact.linkPrecedence === linkPrecedence.primary
    );
    const [primaryContact] = primaryContacts;
    // check for multiple primary contacts
    if (primaryContacts.length > 1) {
      primaryContacts.shift();
      // update rest of contacts to secondary contacts
      primaryContacts.forEach((contact) => {
        const secondaryContactParams: UpdateContactParams = {
          id: contact.id!,
          linkedId: primaryContact.id!,
          linkPrecedence: linkPrecedence.secondary,
          updatedAt: new Date(),
        };
        updateContact(secondaryContactParams);
      });
    } else {
      contactArray.forEach((contact) => {
        if (
          (contactBody.email !== contact.email && contactBody.email !== null) ||
          (contactBody.phoneNumber !== contact.phoneNumber &&
            contactBody.phoneNumber !== null)
        ) {
          // create secondary contact
          createSecondaryContact(contactBody, primaryContact);
        }
      });
    }
  } catch (error: any) {
    if (error instanceof ErrorException) throw error;
    console.error(
      `${APP_INSTANCE_ID}: ${fileName} -> Error while Verifying Secondary Contact: ${error}`
    );

    throw getInternalServerTmfError(error.message);
  }
};
