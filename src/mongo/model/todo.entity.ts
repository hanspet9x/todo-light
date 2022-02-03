import {model} from 'mongoose';
import { TodoSchema } from './../schema/todo.schema';

export const TodoModel = model('todo', TodoSchema)