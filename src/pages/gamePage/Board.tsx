import React, { useState } from "react";
import classes from "./Game.module.css";
import Square from "./Square";
import { Box } from "@mui/material";
import { gameWinner } from "../../util/gameWinner";

interface BoardProps {
  squares: any[];
  isXTurn: boolean;
  onPlay: (nextSquares: any[]) => void;
}

function Board({ squares, isXTurn, onPlay }: BoardProps) {
  let winner = gameWinner(squares);

  const handleClick = (i: number) => {
      if (squares[i] || gameWinner(squares)) {
      return;
    }
    const newArray = squares.slice();
    if (isXTurn) {
      newArray[i] = "X";
    } else {
      newArray[i] = "O";
    }
    onPlay(newArray);
  };
  return (
    <Box className={classes.board}>
      <div className={classes.row}>
        <Square id={0} value={squares[0]} handleClick={handleClick} />
        <Square id={1} value={squares[1]} handleClick={handleClick} />
        <Square id={2} value={squares[2]} handleClick={handleClick} />
      </div>
      <div className={classes.row}>
        <Square id={3} value={squares[3]} handleClick={handleClick} />
        <Square id={4} value={squares[4]} handleClick={handleClick} />
        <Square id={5} value={squares[5]} handleClick={handleClick} />
      </div>
      <div className={classes.row}>
        <Square id={6} value={squares[6]} handleClick={handleClick} />
        <Square id={7} value={squares[7]} handleClick={handleClick} />
        <Square id={8} value={squares[8]} handleClick={handleClick} />
      </div>
      {winner && <p>winner is {winner}</p>}
    </Box>
  );
}

export default Board;
