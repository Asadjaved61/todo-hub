import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todos from "./Todos";
import { Provider } from "react-redux";
import store from "../../redux/store";

// Create a custom render function
const renderWithRedux = (component: React.ReactNode) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("Todos Component", () => {
  test("renders without crashing", () => {
    renderWithRedux(<Todos />);
    expect(screen.getByTestId("todos-component")).toBeInTheDocument();
  });

  test("allows users to add items", () => {
    renderWithRedux(<Todos />);
    fireEvent.change(screen.getByPlaceholderText("New task..."), {
      target: { value: "Learn React Testing" },
    });
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Learn React Testing")).toBeInTheDocument();
  });

  test("allows users to toggle items", () => {
    renderWithRedux(<Todos />);
    // Add a todo first
    fireEvent.change(screen.getByPlaceholderText("New task..."), {
      target: { value: "New todo" },
    });
    fireEvent.click(screen.getByText("Add"));
    // Toggle the todo
    fireEvent.click(screen.getByTestId("checkbox-input-New todo"));

    expect(screen.getByText("New todo")).toHaveClass("todo-completed");
  });

  test("allows users to delete items", () => {
    renderWithRedux(<Todos />);
    // Add and then delete a todo
    fireEvent.change(screen.getByPlaceholderText("New task..."), {
      target: { value: "Study Jest" },
    });
    fireEvent.click(screen.getByText("Add"));
    fireEvent.click(screen.getByTestId("remove-btn-Study Jest"));
    // Assert the todo is not in the document
    expect(screen.queryByText("Study Jest")).not.toBeInTheDocument();
  });
});
