import mongoose from 'mongoose';
import { ITodo } from '../entities/todo.entity';
;

export const TodoSchema = new mongoose.Schema<ITodo>({
    title: String,
    createdAt: Number,
    updatedAt: Number,
})