import React, { FC } from "react";
import "./style.css";

interface SquareProps {
  isAMineSquare: boolean;
  isFlagged: boolean;
  isSquareOpen: boolean;
  numberOfAdjacentMines: number|null;
  squareId: object;
}
const Square: FC<SquareProps> = (props) => {
  const {
    isAMineSquare,
    isFlagged,
    isSquareOpen,
    numberOfAdjacentMines,
    squareId,
  } = props;

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
        {isAMineSquare ? <span>💣</span> : <span>{numberOfAdjacentMines}</span>}
        {<br />}
      </button>
    </div>
  );
};

export default Square;
