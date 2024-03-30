import { getInternalServerTmfError } from "../helpers/commonErrors";
import { codeInstance } from "../helpers/codeInstanceID";
import { Contact, ContactBody } from "../models/contactType";
import { connection } from "../server";

const APP_INSTANCE_ID = codeInstance.getInstance();

const fileName = "GetContactRepository";

export const getContactsFromDB = async (contactBody: ContactBody) => {
  try {
    console.info(
      `${APP_INSTANCE_ID}: ${fileName} -> Fetching Contacts for: ${JSON.stringify(
        contactBody
      )}`
    );
    // Get all contacts based on email and phone number
    let { email, phoneNumber } = contactBody;

    email = email ? email : null;
    phoneNumber = phoneNumber ? phoneNumber : null;

    const query = `  SELECT * FROM Contacts WHERE 
        email = ? OR phoneNumber = ?
        ORDER BY createdAt ASC;`;

    const [contacts] = await (
      await connection
    ).query(query, [email, phoneNumber]);

    console.debug(
      `${APP_INSTANCE_ID}: ${fileName} -> Contacts found: ${JSON.stringify(
        contacts
      )}`
    );

    return contacts as Contact[];
  } catch (err: any) {
    console.error(
      `${APP_INSTANCE_ID}: ${fileName} -> Error while retriving Contacts from DB: ${err}`
    );
    throw getInternalServerTmfError(err);
  }
};
