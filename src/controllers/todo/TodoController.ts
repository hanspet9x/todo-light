import express, { Response, Request } from "express";
import { validateSchemaMiddleware } from "../../middleware/verifySchema.middleware";
import { ITodo } from "../../mongo/entities/todo.entity";
import { ResponseService } from "../../services/response/ResponseService";
import { TodoService } from "../../services/todo/TodoService";
import { LogService } from "./../../services/log/LogService";
import { TodoValidator } from "./todo.joi";

const TodoController = express.Router();

TodoController.route("/")
  .get(async (request: Request, response: Response) => {
    try {
      const data = await TodoService.get();
      ResponseService.json(response, data, 200);
    } catch (error: any) {
      LogService.log(error);
      ResponseService.error(response, error.message, 500);
    }
  })
  .post(
      validateSchemaMiddleware(TodoValidator.add),
      async (request: Request, response: Response) => {
    try {
      let body = request.body;
      if (!Array.isArray(body)) {
        body = [body];
      }
      const data = await TodoService.add(body as ITodo[]);
      ResponseService.json(response, data, 201);
    } catch (error: any) {
      LogService.log(error);
      ResponseService.error(response, error.message, 500);
    }
  })
  .put(
    validateSchemaMiddleware(TodoValidator.update),
      async (request: Request, response: Response) => {
    try {
      let { id, title } = request.body;
      const data = await TodoService.updateTitle(id, title);
      ResponseService.json(response, data, 200);
    } catch (error: any) {
      LogService.log(error);
      ResponseService.error(response, error.message, 500);
    }
  })
  .delete(
    validateSchemaMiddleware(TodoValidator.delete),
      async (request: Request, response: Response) => {
    try {
      const { id } = request.body;
      await TodoService.delete(id);
      ResponseService.json(response, "Todo deleted");
    } catch (error: any) {
      LogService.log(error);
      ResponseService.error(response, error.message, 500);
    }
  });
export default TodoController;
