import { Injectable } from "@angular/core";
import { TODOS } from "./mock.todo";
import { Todo } from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
    async getTodos() {
        await sleep(1000);
        return TODOS;
    }

    async addTodo(todo: Partial<Todo>) {
        await sleep(1000);
        return {
            id: Math.random().toString(36).substring(2, 9),
            ...todo
        } as Todo;
    }

    async deleteTodo(id: number) {
        await sleep(1000);
        return id;
    }

    async completeTodo(id: number) {
        await sleep(500);
        return id;
    }


}

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}