import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./contexts/TodoContext";

const App = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("myTodos")) ?? [];
  });

  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ ...todo, id: Date.now() }, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, updatedText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, content: updatedText } : todo
      )
    );
  };
  return (
    <TodoProvider value={{ addTodo, editTodo, deleteTodo, todos }}>
      <div className="container w-full min-h-screen bg-indigo-800 text-white flex flex-col items-center">
        <h1 className="text-4xl my-5 font-bold">Manage Todos, Easy!</h1>
        <TodoForm todos={todos} />
      </div>
    </TodoProvider>
  );
};

export default App;
