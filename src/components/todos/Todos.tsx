import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../redux/features/todosSlice";
import "./Todos.css";
import TodoList from "./TodoList";
import { TodoI, TodoStatus } from "../../interfaces/todo.interface";

const Todos: React.FC = () => {
  const [input, setInput] = useState("");
  const todos = useSelector((state: any) => state.todos.todos);
  const dispatch = useDispatch();
  // Calculate the number of active todos
  const activeTodosCount = todos.filter(
    (todo: TodoI) => todo.status === TodoStatus.Active
  ).length;
  // Calculate the number of completed todos
  const completedTodosCount = todos.filter(
    (todo: TodoI) => todo.status === TodoStatus.Completed
  ).length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        // Logic to navigate to the next task
      }
      if (e.key === "ArrowUp") {
        // Logic to navigate to the previous task
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(addTodo(input));
      setInput("");
    },
    [dispatch, input]
  );

  return (
    <div className='container py-5' data-testid='todos-component'>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col col-xl-10'>
          <div className='card' style={{ borderRadius: "15px" }}>
            <div className='card-body p-5'>
              <h5 className='mb-3'>Create Task List</h5>
              <form
                className='d-flex justify-content-center align-items-center mb-3'
                onSubmit={handleSubmit}
              >
                <div className='form-outline flex-fill'>
                  <input
                    type='text'
                    className='form-control'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='New task...'
                    aria-label='New task'
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-info ms-2'
                  disabled={!input}
                >
                  Add
                </button>
              </form>
              <div className='d-flex'>
                <p className='text-muted'>
                  Active Todos:{" "}
                  <span className='badge bg-info'>{activeTodosCount}</span>
                </p>
                <p className='text-muted mx-2'>
                  Completed Todos:{" "}
                  <span className='badge bg-success'>
                    {completedTodosCount}
                  </span>
                </p>
              </div>
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Todos);
