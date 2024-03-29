import express, { Application } from "express";
import { mysqlClient } from "./clients/mysqlClient";

const app: Application = express();

mysqlClient.connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    "Server is running on environment:",
    process.env.ENVIRONMENT,
    "port:",
    PORT
  );
});
