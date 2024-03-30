import express, { Application } from "express";
import { mysqlClient } from "./clients/mysqlClient";
const contactRoutes = require("./routes/contactRoutes");

const app: Application = express();

app.use(express.json());
app.use(express.static("public"));

export const connection = mysqlClient.connectDB();

app.use("/api/contact/v1", contactRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    "Server is running on environment:",
    process.env.ENVIRONMENT,
    "port:",
    PORT
  );
});
