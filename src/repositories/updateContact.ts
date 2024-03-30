import { getInternalServerTmfError } from "../helpers/commonErrors";
import { codeInstance } from "../helpers/codeInstanceID";
import { UpdateContactParams } from "../models/contactType";
import { connection } from "../server";

const APP_INSTANCE_ID = codeInstance.getInstance();

const fileName = "UpdateContactRepository";

export const updateContact = async (contactParams: UpdateContactParams) => {
  try {
    console.info(
      `${APP_INSTANCE_ID}: ${fileName} -> Got Update Contact Request for ${JSON.stringify(
        contactParams
      )}`
    );
    // Update Primaty contact to secondary
    const query = ` UPDATE Contacts SET linkedId = ?, linkPrecedence = ?, updatedAt = ?
    WHERE id = ?;`;

    const result = await (
      await connection
    ).query(query, [
      contactParams.linkedId,
      contactParams.linkPrecedence,
      contactParams.updatedAt,
      contactParams.id,
    ]);

    console.debug(
      `${APP_INSTANCE_ID}: ${fileName} -> Contact updated: ${JSON.stringify(
        result
      )}`
    );

    return result;
  } catch (err: any) {
    console.error(
      `${APP_INSTANCE_ID}: ${fileName} -> Error while updating Contact in DB: ${err}`
    );
    throw getInternalServerTmfError(err);
  }
};
