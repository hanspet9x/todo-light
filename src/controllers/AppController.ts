import express from "express";
import { validateTokenMiddleware } from "../middleware/token.middleware";
import { AppRoutes } from "../routes/AppRoutes";
import TodoController from "./todo/TodoController";

const AppController = express.Router();
AppController.use(AppRoutes.todo, validateTokenMiddleware(), TodoController);

export default AppController;
