import React, { useMemo } from "react";
import { TodoI, TodoStatus } from "../../interfaces/todo.interface";
import TodoItem from "./TodoItem";

const TodoList = ({ todos }: { todos: TodoI[] }) => {
  // Sort todos so that completed tasks are moved to the bottom
  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (
        a.status === TodoStatus.Completed &&
        b.status !== TodoStatus.Completed
      ) {
        return 1;
      } else if (
        a.status !== TodoStatus.Completed &&
        b.status === TodoStatus.Completed
      ) {
        return -1;
      }
      return 0;
    });
  }, [todos]);

  return (
    <ul className='list-group'>
      {sortedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
