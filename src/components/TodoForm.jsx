import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

const TodoForm = ({ todos }) => {
  const { addTodo, deleteTodo, editTodo } = useTodo();
  const [inputVal, setInputVal] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null); 
  const add = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    addTodo({ id: Date.now(), content: inputVal });
    setInputVal("");
  };

  const deleteTodoItem = (id) => {
    deleteTodo(id);
  };

  const handleEditClick = (id, content) => {
    setIsEditing(true);
    setEditId(id);
    setInputVal(content);
  };

  const handleUpdate = () => {
    if (!inputVal.trim()) return;
    editTodo(editId, inputVal);
    setInputVal("");
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="max-h-[90vh] w-[600px] p-4 border border-gray-400 rounded-md mx-auto">
      <div className="w-full flex gap-1">
        <input
          autoFocus
          type="text"
          placeholder="Enter Todo Here"
          className="bg-white text-black placeholder:text-gray-700 p-3 rounded-xl w-[90%] outline-none"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        {!isEditing ? (
          <button
            className="bg-white text-indigo-800 rounded-xl px-5 py-3 font-bold cursor-pointer"
            onClick={add}
          >
            Add
          </button>
        ) : (
          <button
            className="bg-white text-indigo-800 rounded-xl px-5 py-3 font-bold cursor-pointer"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="text-white bg-indigo-600 shadow-lg rounded-xl list-none p-3 mt-3 flex items-center justify-between"
          >
            <span>{todo.content}</span>
            <div className="flex gap-1">
              <button
                className="bg-green-700 hover:bg-green-800 px-3 py-1 text-white rounded-xl font-bold cursor-pointer"
                onClick={() => handleEditClick(todo.id, todo.content)}
              >
                Edit
              </button>
              <button
                className="bg-red-700 hover:bg-red-800 px-3 py-1 text-white rounded-xl font-bold cursor-pointer"
                onClick={() => deleteTodoItem(todo.id)}
              >
                Del
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoForm;
