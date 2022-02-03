import { ITodo } from "../../mongo/entities/todo.entity";
import { TodoRepo } from "../../repo/todo/TodoRepo";

export const TodoService = {
    async add(todo: ITodo[]) {
        return TodoRepo.add(todo);
    },

    async updateTitle(id: string, title: string) {
        return TodoRepo.updateTitle(id, title);
    },

    async get() {
        return TodoRepo.get();
    },

    async delete(id: string) {
        return TodoRepo.delete(id);
    }
}