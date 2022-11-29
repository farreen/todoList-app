import React, { FC, ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import Item from "./components/Item";

export type todoType = {
  _id: string;
  todoName: string;
};

const App: FC = () => {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<todoType[]>([]);
  const [isUpdating, setNewUpdating] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const listOfTodos = async () => {
    let response = await fetch("http://localhost:8080/todo/get");
    let rawTodo = await response.json();
    setTodos(rawTodo);
  };
  useEffect(() => {
    listOfTodos();
  }, []);

  const addTodo = async () => {
    if (isUpdating === "") {
      let response = await fetch("http://localhost:8080/todo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        setText("");
        listOfTodos();
      }
    } else {
      const data = { id: isUpdating, text };
      let response = await fetch("http://localhost:8080/todo/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (response.ok) {
        setText("");
        listOfTodos();
        setNewUpdating("");
        console.log("inside update2");
      }
    }
  };

  const updateTodo = (id: string, todoName: string) => {
    setNewUpdating(id);
    setText(todoName);
    console.log("inside update1");
  };

  const deleteTodo = async (id: string) => {
    let response = await fetch("http://localhost:8080/todo/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    console.log("inside delete fn", response);
    listOfTodos();
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo App</h1>
        <div className="top">
          <input
            type="text"
            value={text}
            placeholder="Enter Todos..."
            onChange={handleChange}
          />
          <button className="add" onClick={addTodo}>
            {isUpdating ? "update" : "Add"}
          </button>
        </div>
        {todos.map((todo: todoType) => (
          <Item
            key={todo._id}
            todoName={todo.todoName}
            updateTodo={() => updateTodo(todo._id, todo.todoName)}
            deleteTodo={() => deleteTodo(todo._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
