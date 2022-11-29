import React from "react";

import "../App.css";

type PropsType = {
  todoName: string;
};

const Item = ({ todoName }: PropsType) => {
  return <div>{todoName}</div>;
};

export default Item;
