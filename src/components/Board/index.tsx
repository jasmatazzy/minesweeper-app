import React, { useState, useEffect } from "react";
import Row from "../../components/Row/index";
import Square from "../../components/Square/index";
import UserConfigOptions from "../UserConfigOptions";
import squareNeighborLookup from "../../functions/squareNeighborLookup";
import GameBoard from "../GameBoard";

const Board = () => {
  const [isGameStarted, setIsGameStarted] = useState(true);
  const [numberOfRows, setNumberOfRows] = useState(5);
  const [numberOfSquares, setNumberOfSquares] = useState(5);
  const [numberOfFlags, setNumberOfFlags] = useState(0);
  const [numberOfMines, setNumberOfMines] = useState(7);

  const totalSquares = numberOfRows * numberOfSquares;

  return (
    <div>
      <GameBoard
      rowCount={numberOfRows}
      columnCount={numberOfSquares}
      mineCount={numberOfMines}
      />
    </div>
  );
};

export default Board;
