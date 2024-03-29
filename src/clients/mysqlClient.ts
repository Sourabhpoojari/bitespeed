import { getInternalServerTmfError } from "../helpers/commonErrors";
import { codeInstance } from "../helpers/codeInstanceID";
import { createConnection, Connection } from "mysql2/promise";

const APP_INSTANCE_ID = codeInstance.getInstance();

const fileName = "MysqlClient";

class MysqlClient {
  async connectDB(): Promise<Connection> {
    try {
      const connection: Connection = await createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: parseInt(process.env.MYSQL_PORT as string),
      });
      console.info(
        `${APP_INSTANCE_ID}: ${fileName} -> Db connection established!`
      );

      return connection;
    } catch (err: any) {
      console.error(`${APP_INSTANCE_ID}: ${fileName} -> Mysql Error: ${err}`);
      throw getInternalServerTmfError(err);
    }
  }
}

export const mysqlClient = new MysqlClient();
