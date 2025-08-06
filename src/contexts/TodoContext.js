import { useContext, createContext } from "react";

export const TodoContext = createContext({
  addTodo: (todo) => {},
  editTodo: (id, todo) => {},
  deleteTodo: (id) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
