import express from "express";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../Controller/AccountCreate.js";

const Router = express.Router();

Router.post("/createuser", userRegister);
Router.post("/userlogin", userLogin);
Router.post("/logout", userLogout);

export default Router;
