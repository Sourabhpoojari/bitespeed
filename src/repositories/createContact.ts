import { getInternalServerTmfError } from "../helpers/commonErrors";
import { codeInstance } from "../helpers/codeInstanceID";
import { Contact } from "../models/contactType";
import { connection } from "../server";

const APP_INSTANCE_ID = codeInstance.getInstance();

const fileName = "CreateContactRepository";

export const createContact = async (contact: Contact) => {
  try {
    // Insert contact
    const query = ` INSERT INTO Contacts (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt, deletedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const result = await (
      await connection
    ).query(query, [
      contact.phoneNumber,
      contact.email,
      contact.linkedId,
      contact.linkPrecedence,
      contact.createdAt,
      contact.updatedAt,
      contact.deletedAt,
    ]);

    console.debug(
      `${APP_INSTANCE_ID}: ${fileName} -> Contact created: ${JSON.stringify(
        result
      )}`
    );

    return result;
  } catch (err: any) {
    console.error(
      `${APP_INSTANCE_ID}: ${fileName} -> Error while creating Contact in DB: ${err}`
    );
    throw getInternalServerTmfError(err);
  }
};
