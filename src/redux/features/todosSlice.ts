import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TodoI, TodoStatus } from "../../interfaces/todo.interface";

export interface TodosState {
  todos: TodoI[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: TodoI = {
        id: uuidv4(), // Generate a unique ID for each todo
        createdAt: new Date().toLocaleString(),
        text: action.payload,
        status: TodoStatus.Active,
      };
      state.todos.push(newTodo);
    },
    toggleTodoStatus: (state, action: PayloadAction<string>) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (todoIndex !== -1) {
        state.todos[todoIndex].status =
          state.todos[todoIndex].status === TodoStatus.Completed
            ? TodoStatus.Active
            : TodoStatus.Completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo, toggleTodoStatus } = todosSlice.actions;

export default todosSlice.reducer;
