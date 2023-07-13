import React from "react";
import classes from "./Game.module.css";

interface SquareProps {
  id: number;
  value: string | null;
  handleClick: (i: number) => void;
}

function Square({ id, value, handleClick }: SquareProps) {
  return (
    <div className={classes.field} onClick={() => handleClick(id)}>
      {value}
    </div>
  );
}

export default Square;
