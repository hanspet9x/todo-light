import { ITodo } from "../../mongo/entities/todo.entity";
import { TodoModel } from "../../mongo/model/todo.entity";

export const TodoRepo = {
    async add(todo: ITodo[]) {
        return TodoModel.create(todo);
    },

    async updateTitle(id: string, title: string) {
        return TodoModel.findByIdAndUpdate(id, {title: title, updated: Date.now()}).lean();
    },

    async get() {
        return TodoModel.find().lean();
    },

    async delete(id: string) {
        return TodoModel.findByIdAndDelete(id).lean();
    }
}