import React, { useState } from "react";
import Board from "./Board";
import classes from "./Game.module.css";

function Game() {
  const [isTurnX, setIsXTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const squares = history[currentMove];
  
  const onPlay = (newArray: any[]) => {
    const newHistory = [...history.slice(0, currentMove + 1), newArray];
    setHistory(newHistory);
    setIsXTurn(!isTurnX);
    setCurrentMove(newHistory.length  -1);
  }

  const jumpTo = (move: number) => {
    setCurrentMove(move);
    setIsXTurn(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let desc;
    if(move > 0){
        desc = 'Jump to move #' + move;
    }else{
        desc = 'Jump to the beggining';
    }
    return <li key={move}><button onClick={() => jumpTo(move)}>{desc}</button></li>
  })
  return (
    <div className={classes.game}>
      <Board isXTurn={isTurnX} squares={squares} onPlay={onPlay}/>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
