import React from "react";
import "./style.css";

interface SquareProps {
  squareState: {
    isAMineSquare: boolean;
    isFlagged: boolean;
    isSquareOpen: boolean;
    neighbors: object;
    numberOfAdjacentMines: number;
    squareId: object;
  };
}
const Square: React.FC<SquareProps> = (props) => {
  const {squareState} = props;


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <button onClick={() => {}}>
        {squareState.isAMineSquare ? <span>💣</span> : <span>😇</span> }
        {<br />}
      </button>
    </div>
  );
};

export default Square;
