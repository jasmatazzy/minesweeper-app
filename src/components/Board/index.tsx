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

interface SquareState {
  isAMineSquare: boolean;
  isFlagged: boolean;
  squareId: object;
  isSquareOpen: boolean;
  neighbors: object;
  numberOfAdjacentMines: number;
  numberOfAdjacentFlags?: number;
}

type Coordinates = {
  row: number;
  square: number;
};

const Board = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isArrayEstablished, setIsArrayEstablished] = useState(false);
  const [numberOfRows, setNumberOfRows] = useState(5);
  const [numberOfSquares, setNumberOfSquares] = useState(5);
  const [numberOfFlags, setNumberOfFlags] = useState(0);
  const [numberOfMines, setNumberOfMines] = useState(5);
  const [stateOfAllSquares, setStateOfAllSquares] = useState<SquareState[][]>(
    []
  );

  const totalSquares = numberOfRows * numberOfSquares;
  const mineSquares: string[] = [];
  const mineSquaresCoordinates: Coordinates[] = [];
  const mineNeighbors: string[] = [];

  const establishSquaresArray = (
    numberOfRows: number,
    numberOfSquares: number
  ) => {
    //set default state of all squares;
    // use mineCount to determine how many squares will be mines; update state of those squares
    // each square receives from each mine neighbor an increment of 1 to its numberOfAdjacentMines
    const allSquares = Array.from({ length: numberOfRows }).map(
      (_, row_index) => {
        return Array.from({ length: numberOfSquares }).map(
          (_, square_index) => {
            return {
              isAMineSquare: false,
              isFlagged: false,
              isSquareOpen: false,
              neighbors: {},
              numberOfAdjacentMines: 0,
              squareId: { row: row_index, square: square_index },
            };
          }
        );
      }
    );
    setStateOfAllSquares(allSquares);
    setIsArrayEstablished(true);
  };

  useEffect(() => {
    if (isGameStarted) {
      establishSquaresArray(numberOfRows, numberOfSquares);
    }
  }, [isGameStarted]);

  useEffect(() => {
    let mineCount = Number((totalSquares * 0.2).toFixed(0));
    if (numberOfMines > totalSquares) {
      setNumberOfMines(mineCount);
    }
    if (numberOfMines < 1) {
      setNumberOfMines(1);
    }
  }, [numberOfRows, numberOfSquares, isGameStarted]);

  useEffect(() => {
    if (isArrayEstablished) {
      // update stateOfAllSquares array with mines
      while (mineSquares.length < numberOfMines) {
        const mineRow = Math.floor(Math.random() * numberOfRows);
        const mineSquare = Math.floor(Math.random() * numberOfSquares);
        const mineSquareString = `{ row: ${mineRow}, square: ${mineSquare} }`;
        if (!mineSquares.includes(mineSquareString)) {
          mineSquares.push(mineSquareString);
        }
      }

      // update stateOfAllSquares array with mines and adjacent mine counts
      setStateOfAllSquares((prev) => {
        return prev.map((row, row_index) => {
          return row.map((square, square_index) => {
            if (
              mineSquares.includes(
                `{ row: ${row_index}, square: ${square_index} }`
              )
            ) {
              return {
                ...square,
                isAMineSquare: true,
              };
            }
            if (
              mineNeighbors.includes(
                `{ row: ${row_index}, square: ${square_index} }`
              )
            ) {
              return {
                ...square,
                numberOfAdjacentMines: (square.numberOfAdjacentMines += 1),
              };
            }
            return square;
          });
        });
      });
    }
  }, [isArrayEstablished]);

  return (
    <div>
      <UserConfigOptions
        isGameStarted={isGameStarted}
        numberOfRows={numberOfRows}
        numberOfSquares={numberOfSquares}
        numberOfMines={numberOfMines}
        totalSquares={totalSquares}
        setIsGameStarted={setIsGameStarted}
        setNumberOfMines={setNumberOfMines}
        setNumberOfRows={setNumberOfRows}
        setNumberOfSquares={setNumberOfSquares}
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
          Array.from({ length: numberOfRows }).map((_, row_index) => (
            <Row key={row_index}>
              {Array.from({ length: numberOfSquares }).map(
                (_, square_index) => {
                  return (
                    <Square
                      key={`${row_index}-${square_index}`}
                      squareState={{
                        isAMineSquare: false,
                        isFlagged: false,
                        isSquareOpen: false,
                        neighbors: {},
                        numberOfAdjacentMines: 0,
                        squareId: { row: row_index, square: square_index },
                      }}
                    />
                  );
                }
              )}
            </Row>
          ))}
      </div>
    </div>
  );
};

export default Board;
