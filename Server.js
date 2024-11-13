import express from "express";
import dotenv from "dotenv";
import DbConnection from "./Config/DbConnection.js";
import cors from "cors";
import bodyParser from "body-parser";

//Routes Import
import userCreate from "./Routes/AccountCreateRoutes.js";
import createtask from "./Routes/TaskRoutes.js";

// config
const app = express();
dotenv.config({ path: "config/.env" });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//api route
app.use("/api", userCreate);
app.use("/api", createtask);

// server listen
DbConnection();
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running successfully on port ${process.env.PORT}`);
});
