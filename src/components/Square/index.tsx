import React, { PropsWithChildren, useState } from "react";
import "./style.css";

const Square = (props: PropsWithChildren<any>) => {

  const { square_id, isAMineSquare, numberOfAdjacentMines} = props;

  const handleClick = () => {
    console.log(`Square ${square_id} clicked, and it is ${ isAMineSquare ? "a mine square" : "not a mine square"}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={() => {
          handleClick();
        }}
        disabled={props.isGameStarted}
      >
        {<span>{!isAMineSquare ? numberOfAdjacentMines : `💣`}</span>}
        {<br />}
      </button>
    </div>
  );
};

export default Square;
