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
  });

  const addTodo = async () => {
    let response = await fetch("http://localhost:8080/todo/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (response.ok) {
      setText("");
      listOfTodos();
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Todo App</h1>
        <div>
          <input
            type="text"
            value={text}
            placeholder="Enter Todos"
            onChange={handleChange}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        {todos.map((todo: todoType) => (
          <Item key={todo._id} todoName={todo.todoName} />
        ))}
      </div>
    </div>
  );
};

export default App;
