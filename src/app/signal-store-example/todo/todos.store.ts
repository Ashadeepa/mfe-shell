import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Todo } from './todo.model';
import { computed, inject } from '@angular/core';
import { TodosService } from './todos.service';

export type TodosFilter = 'all' | 'completed' | 'pending';

type TodoState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  filter: 'all',
};

export const TodosStore = signalStore(
  { providedIn: 'root' }, // This is the same as providing the store in the root module
  withState(initialState), // This is the same as providing the initial state in the root module

  // The withMethods function is used to define the store's methods
  withMethods((store, todosService = inject(TodosService)) => ({
    async loadAll() {
      patchState(store, { loading: true });
      const todos = await todosService.getTodos();
      patchState(store, { todos, loading: false });
    },

    async addTodo(title: string) {
      patchState(store, { loading: true });
      const newTodo = await todosService.addTodo({
        title: title,
        completed: false,
      });
      patchState(store, (state) => ({
        todos: [...state.todos, newTodo],
        loading: false,
      }));
    },

    async deleteTodo(id: number) {
      patchState(store, { loading: true });
      await todosService.deleteTodo(id);
      patchState(store, (state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        loading: false,
      }));
    },

    async completeTodo(id: number, completed: boolean) {
      // patchState(store, { loading: true });
      await todosService.completeTodo(id);
      // console.log('completed', completed);

      patchState(store, (state) => ({
        todos: state.todos.map((todo) =>{
          return todo.id === id ? { ...todo, completed } : todo
        }),
      }));

      console.log(store.todos());
      

      // patchState(store, { loading: false });
    },

    updateFilter(filter: TodosFilter) {
      
      
      patchState(store, { filter });
      console.log('filter', store.filter());
    },
  })),

  // The withComputed function is used to define the store's computed properties
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const todos = state.todos();
      console.log(state.filter());
      if (state.filter() === 'completed') {
        console.log(todos.filter((todo) => todo.completed));
        
      } else if (state.filter() === 'pending') {
        console.log(todos.filter((todo) => !todo.completed));
      } else {
        console.log(todos);
      }
      switch (state.filter()) {
        case 'completed':
          return todos.filter((todo) => todo.completed);
        case 'pending':
          return todos.filter((todo) => !todo.completed);
        default:
          return todos;
      }
    }),
  }))
);
