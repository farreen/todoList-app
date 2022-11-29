import React from "react";

import "../App.css";

type PropsType = {
  todoName: string;
  deleteTodo: () => void;
  updateTodo: () => void;
};

const Item = ({ todoName, deleteTodo, updateTodo }: PropsType) => {
  return (
    <div className="item">
      <div className="text">{todoName}</div>
      <div className="button">
        <button onClick={updateTodo}>update</button>
        <button onClick={deleteTodo}>delete</button>
      </div>
    </div>
  );
};

export default Item;
