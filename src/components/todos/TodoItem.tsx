import React from "react";
import { useDispatch } from "react-redux";
import { removeTodo, toggleTodoStatus } from "../../redux/features/todosSlice";
import { TodoI, TodoStatus } from "../../interfaces/todo.interface";

const TodoItem = React.memo(({ todo }: { todo: TodoI }) => {
  const dispatch = useDispatch();

  return (
    <li
      className={`todo-item list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2 ${
        todo.status === TodoStatus.Completed
          ? "todo-completed bg-light text-muted"
          : ""
      }`}
    >
      <div className='col-8 d-flex align-items-center todo-item-text'>
        <input
          type='checkbox'
          className='form-check-input me-2'
          title='Toggle Status'
          checked={todo.status === TodoStatus.Completed}
          onChange={() => dispatch(toggleTodoStatus(todo.id))}
          aria-labelledby={`todo-label-${todo.text}`}
          data-testid={`checkbox-input-${todo.text}`}
        />
        <span id={`todo-label-${todo.id}`}>{todo.text}</span>
        <span className='badge'>
          {todo.status === TodoStatus.Completed ? "✅" : "❌"}{" "}
        </span>
      </div>
      <div className='col small text-muted mx-2' title='Created Time'>
        {todo.createdAt}
      </div>
      <span>
        <button
          className='btn btn-danger btn-sm'
          onClick={() => dispatch(removeTodo(todo.id))}
          data-testid={`remove-btn-${todo.text}`}
        >
          Remove
        </button>
      </span>
    </li>
  );
});

export default TodoItem;
