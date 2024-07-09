import React, { useState, useEffect } from "react";
import Row from "../../components/Row/index";
import Square from "../../components/Square/index";
import UserConfigOptions from "../UserConfigOptions";
import { set } from "core-js/core/dict";
import { is } from "core-js/core/object";
import { all } from "core-js/fn/promise";

// 1. main object of board square state
// 2. individual squares should know if they are opened or closed; a mine or not; count of adjacent mine neighbors (provided by mines)
// 3. mined squares should be randomly placed, and should notify all neighbors of their presence
// 4. squares without mines should check the notification array for mines, and count the number of times they are notified
// 5. Squares touching 0 mines should automatically open all non-mine neighbors
// 6. If a square is clicked, and it is a mine, the game is over
// 7. If a square is open and contains a number that equals the number of mines touching it, all non-open neighbors should be opened


interface SquareState {
  isAMineSquare: boolean;
  isFlagged: boolean;
  squareId: object;
  isSquareOpen: boolean;
  numberOfAdjacentMines?: number;
  numberOfAdjacentFlags?: number;
}

type Coordinates = {
  row: number;
  column: number;
};

const Board = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isArrayEstablished, setIsArrayEstablished] = useState(false);
  const [numOfRows, setNumOfRows] = useState(5);
  const [numOfColumns, setNumOfColumns] = useState(5);
  const [numOfFlags, setNumOfFlags] = useState(0);
  const [numOfMines, setNumOfMines] = useState(5);
  const [stateOfAllSquares, setStateOfAllSquares] = useState<SquareState[][]>(
    []
  );

  const numOfSquares = numOfRows * numOfColumns;

  const establishSquaresArray = (
    numOfRows: number,
    numOfColumns: number,
    numOfMines: number
  ) => {
    //set default state of all squares;
    // use mineCount to determine how many squares will be mines; update state of those squares
    // each square receives from each mine neighbor an increment of 1 to its numberOfAdjacentMines
    const allSquares = Array.from({ length: numOfRows }).map((_, row_index) => {
      return Array.from({ length: numOfColumns }).map((_, column_index) => {
        return {
          isAMineSquare: false,
          isFlagged: false,
          isSquareOpen: false,
          numberOfAdjacentMines: 0,
          squareId: { row: row_index, column: column_index },
        };
      });
    });
    setStateOfAllSquares(allSquares);
    setIsArrayEstablished(true);

    //       const allMineSquareNeighbors: Coordinates[] = [
    //         { row: mineSquareRow - 1, col: mineSquareCol - 1 },
    //         { row: mineSquareRow - 1, col: mineSquareCol },
    //         { row: mineSquareRow - 1, col: mineSquareCol + 1 },
    //         { row: mineSquareRow, col: mineSquareCol - 1 },
    //         { row: mineSquareRow, col: mineSquareCol + 1 },
    //         { row: mineSquareRow + 1, col: mineSquareCol - 1 },
    //         { row: mineSquareRow + 1, col: mineSquareCol },
    //         { row: mineSquareRow + 1, col: mineSquareCol + 1 },
    //       ];
    //       const validNeighborSquares = (
    //         allMineSquareNeighbors: Coordinates[]
    //       ) => {
    //         return allMineSquareNeighbors.filter((neighbor) => {
    //           return (
    //             neighbor.row > 0 &&
    //             neighbor.row <= numOfRows &&
    //             neighbor.col > 0 &&
    //             neighbor.col <= numOfColumns
    //           );
    //         });
    //       };
  };

  useEffect(() => {
    if (isGameStarted) {
      establishSquaresArray(numOfRows, numOfColumns, numOfMines);
    }
  }, [isGameStarted]);

  useEffect(() => {
    let mineCount = Number((numOfSquares * 0.2).toFixed(0));
    if (numOfMines > numOfSquares) {
      setNumOfMines(mineCount);
    }
    if (numOfMines < 1) {
      setNumOfMines(1);
    }
  }, [numOfRows, numOfColumns, isGameStarted]);

  useEffect(() => {
    if (isArrayEstablished) {
      // update stateOfAllSquares array with mines
      const mineSquares: string[] = [];
      while (mineSquares.length < numOfMines) {
        const mineRow = Math.floor(Math.random() * numOfRows);
        const mineColumn = Math.floor(Math.random() * numOfColumns);
        const mineSquare = `{ row: ${mineRow}, column: ${mineColumn} }`;

        // check if mine's isAMineSquare is false
        if (mineSquares.includes(mineSquare)) {
          console.log(`mine ${mineSquare} already exists`);
          continue;
        }
        setStateOfAllSquares((prev) => {
          return prev.map((row, row_index) => {
            return row.map((square, column_index) => {
              if (row_index === mineRow && column_index === mineColumn) {
                return {
                  ...square,
                  isAMineSquare: true,
                };
              }
              return square;
            });
          });
        });
        mineSquares.push(mineSquare);
        console.log(`mine ${mineSquare} added`);
      }
    }
  }, [isArrayEstablished]);

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
      <div>
        {stateOfAllSquares.map((row, row_index) => {
          return (
            <Row key={row_index}>
              {row.map((square, square_index) => {
                return (
                  <Square
                    key={`${row_index}-${square_index}`}
                    squareState={square}
                  />
                );
              })}
            </Row>
          );
        })}
        {/* ⬇️ Dynamic Board with no state for benefit of user experience; this board is replaced with "live cells" once the user starts the game */}
        {stateOfAllSquares.length <= 0 &&
          Array.from({ length: numOfRows }).map((_, row_index) => (
            <Row key={row_index}>
              {Array.from({ length: numOfColumns }).map((_, column_index) => {
                return (
                  <Square
                    key={`${row_index}-${column_index}`}
                    squareState={{
                      isAMineSquare: false,
                      isFlagged: false,
                      isSquareOpen: false,
                      squareId: { row: row_index, column: column_index },
                    }}
                  />
                );
              })}
            </Row>
          ))}
      </div>
    </div>
  );
};

export default Board;
