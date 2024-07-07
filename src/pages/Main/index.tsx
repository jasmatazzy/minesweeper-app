import React, { Component } from "react";
import Board from "../../components/Board";

const Main = (): JSX.Element => {
  return (
    <div>
      <div>I Guess This Is Minesweeper</div>
      <Board />
    </div>
  );
};

export default Main;
