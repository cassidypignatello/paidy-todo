import React, { createContext, useReducer } from "react";
import { Todo } from "../types";

// Type of the todo state
interface TodoState {
  todos: Todo[];
}

// Type of the todo context
interface TodoContextProps {
  state: TodoState;
  dispatch: React.Dispatch<Action>;
}

// Initial todo state
const initialState: TodoState = {
  todos: [],
};

// Define the context
export const TodoContext = createContext<TodoContextProps>({
  state: initialState,
  dispatch: () => null,
});

type Action =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "UPDATE_TODO"; payload: Todo }
  | { type: "EDIT_TODO"; payload: Todo };

export const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        ),
      };
    default:
      return state;
  }
};

export const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
