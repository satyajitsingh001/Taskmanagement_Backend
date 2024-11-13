import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskStatusCounts,
  updateTask,
} from "../Controller/TaskManage.js";
import { isAuth } from "../middleware/authorizedUser.js";

const Router = express.Router();

Router.post("/taskscreate", isAuth, createTask);
Router.get("/tasks", isAuth, getAllTasks);
Router.delete("/tasks/:id", isAuth, deleteTask);
Router.put("/tasks/:id", isAuth, updateTask);
Router.get("/tasksdetails", isAuth, getTaskStatusCounts);

export default Router;
