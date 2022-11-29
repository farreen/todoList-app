import React, {FC, ChangeEvent, useState, useEffect} from 'react';
import './App.css';
import Item from './components/Item';

export type todoType = {
  _id: string;
  todoName: string;
}

const App: FC = () => {
    const [text, setText] = useState<string>("");
    const [todos, setTodos] = useState<todoType[]>([]);
    
    const listOfTodos = async() => {
        let response = await fetch("http://localhost:8080/todo/get");
        let rawTodo = await response.json();
        setTodos(rawTodo);
    }
    useEffect(() => {
        listOfTodos();
    })
  return (
    <div className="App">
    <div>
      <h1>Todo App</h1>
      {
        todos.map((todo: todoType) => <Item 
        key={todo._id}
        todoName={todo.todoName}
        />)
      } 
    </div>
    </div>
  );
}

export default App;
