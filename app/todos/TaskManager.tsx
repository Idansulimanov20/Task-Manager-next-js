"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

const TaskManager = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null); // State to handle editing

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!title.trim() || !description.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toLocaleString(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
    setDescription("");
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const deleteSelectedTodos = () => {
    setTodos((prev) => prev.filter((todo) => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]);
  };

  const toggleSelectTodo = (id: number) => {
    setSelectedTodos((prev) =>
      prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]
    );
  };

  const handleEditTodo = (todo: Todo) => {
    setEditTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const handleSaveEdit = () => {
    if (editTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo.id ? { ...todo, title, description } : todo
      );
      setTodos(updatedTodos);
      setEditTodo(null); 
      setTitle("");
      setDescription("");
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase()) ||
    todo.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="flex flex-col items-center p-6 w-1/3 text-white">
        <h1 className="text-3xl font-extrabold mb-6 shadow-lg">Task Manager</h1>
        <div className="flex flex-col gap-4 mb-6 w-80">
          <input
            type="text"
            className="border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
          <textarea
            className="border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />
          <button
            className="bg-purple-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
            onClick={editTodo ? handleSaveEdit : addTodo}
          >
            {editTodo ? "Save Changes" : "Add Task"}
          </button>
          <input
            type="text"
            className="border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
          />
        </div>
        {selectedTodos.length > 0 && (
          <button
            className="bg-red-600 text-white px-5 py-2 mb-4 rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={deleteSelectedTodos}
          >
            Delete Selected Tasks
          </button>
        )}
      </div>

      <div className="w-2/3 p-6 overflow-auto text-white">
        <table className="w-full bg-white shadow-lg rounded-lg text-black">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-center">Select</th>
              <th className="p-3 text-center">Title</th>
              <th className="p-3 text-center">Description</th>
              <th className="p-3 text-center">Created At</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 p-3">
                  No tasks available
                </td>
              </tr>
            ) : (
              filteredTodos.map((todo) => (
                <tr key={todo.id} className="border-b">
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedTodos.includes(todo.id)}
                      onChange={() => toggleSelectTodo(todo.id)}
                    />
                  </td>
                  <td className="p-3 text-center">{todo.title}</td>
                  <td className="p-3 text-center">{todo.description}</td>
                  <td className="p-3 text-center">{todo.createdAt}</td>
                  <td className="p-3 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition"
                      onClick={() => handleEditTodo(todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition ml-2"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManager;
