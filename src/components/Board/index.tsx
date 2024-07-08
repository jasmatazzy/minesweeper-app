import React, { useState, useEffect } from "react";
import Row from "../../components/Row/index";
import Square from "../../components/Square/index";
import UserConfigOptions from "../UserConfigOptions";

// 1. main object of board square state
// 2. individual squares should know if they are opened or closed; a mine or not; count of adjacent mine neighbors (provided by mines)
// 3. mined squares should be randomly placed, and should notify all neighbors of their presence
// 4. squares without mines should check the notification array for mines, and count the number of times they are notified
// 5. Squares touching 0 mines should automatically open all non-mine neighbors
// 6. If a square is clicked, and it is a mine, the game is over
// 7. If a square is open and contains a number that equals the number of mines touching it, all non-open neighbors should be opened

// Needed state:
// 1. isGameStarted
// 2. numOfRows
// 3. numOfColumns
// 4. numOfMines
// 5. totalNumOfSquares
// 6. squares and their specific states including:
//    - isAMineSquare
//    - isSquareOpen
//    - numberOfAdjacentMines
//    - square_id
//    - neighbors
//    - openNeighbors

const Board = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [numOfRows, setNumOfRows] = useState(5);
  const [numOfColumns, setNumOfColumns] = useState(5);
  const [numOfMines, setNumOfMines] = useState(
    Math.fround(numOfRows * numOfColumns * 0.2)
  );

  const numOfSquares = numOfRows * numOfColumns;

  useEffect (()=>{
    const mineCount = Number((numOfSquares * 0.2).toFixed(0));
    if (numOfMines > numOfSquares) {
      setNumOfMines(mineCount)
      alert("Number of mines cannot exceed the total number of squares")
    }

  },[numOfRows, numOfColumns, isGameStarted])

  return (
    <div>
      <UserConfigOptions
        isGameStarted={isGameStarted}
        numOfRows={numOfRows}
        numOfColumns={numOfColumns}
        numOfMines={numOfMines}
        numOfSquares={numOfSquares}
        setIsGameStarted={setIsGameStarted}
        setNumOfMines={setNumOfMines}
        setNumOfRows={setNumOfRows}
        setNumOfColumns={setNumOfColumns}
      />
      {Array.from({ length: numOfRows }).map((_, rowIndex) => {
        return (
          <Row key={rowIndex}>
            {Array.from({ length: numOfColumns }).map((_, colIndex) => {
              return (
                <Square
                  key={colIndex + 1}
                  columnId={colIndex + 1}
                  isGameStarted={isGameStarted}
                  numOfRows={numOfRows}
                  numOfColumns={numOfColumns}
                  rowId={rowIndex + 1}
                />
              );
            })}
          </Row>
        );
      })}
    </div>
  );
};

export default Board;
