import React, { FC } from "react";
import Row from "../Row";
import Square from "../Square";
import squareNeighborLookup from "../../functions/squareNeighborLookup";

interface GameBoardProps {
  rowCount: number;
  columnCount: number;
  mineCount: number;
}

const GameBoard: FC<GameBoardProps> = ({
  rowCount,
  columnCount,
  mineCount,
}) => {
  const board: JSX.Element[] = [];
  const mineNeighbors: {
    row: number;
    column: number;
    neighborMines: number;
  }[] = [];

  // return an array of mine locations based on shape of the board and user input
  const buriedMines = () => {
    const mineLocations: {
      row: number;
      column: number;
    }[] = [];
    while (mineLocations.length < mineCount) {
      const row = Math.floor(Math.random() * rowCount);
      const column = Math.floor(Math.random() * columnCount);
      const newMineLocation = { row, column };
      const isDuplicate = mineLocations.some(
        (location) =>
          location.row === newMineLocation.row &&
          location.column === newMineLocation.column
      );
      if (isDuplicate) {
        continue
      }
      else {
        mineLocations.push(newMineLocation);
      }
    }
    return mineLocations;
  };

  const mineLocations = buriedMines();

  //for each mine in mineLocations, iterate over the array and add 1 to the value of each neighbor of the mine
  const identifiedMineNeighbors = (
    mineLocations: { row: number; column: number }[],
    boardDimensions: { rowCount: number; columnCount: number }
  ) => {
    const mineNeighbors: {
      row: number;
      column: number;
      knownNeighborCount: number;
    }[] = [];
    mineLocations.forEach((mine) => {
      const neighborsToNotify = squareNeighborLookup(
        mine.row,
        mine.column,
        boardDimensions.rowCount,
        boardDimensions.columnCount
      );
      neighborsToNotify.forEach((neighbor) => {
        const isNeighborKnown = mineNeighbors.some(
          (knownNeighbor) =>
            knownNeighbor.row === neighbor.row &&
            knownNeighbor.column === neighbor.column
        );
        if (isNeighborKnown) {
          const knownNeighbor = mineNeighbors.find(
            (knownNeighbor) =>
              knownNeighbor.row === neighbor.row &&
              knownNeighbor.column === neighbor.column
          );
          if (knownNeighbor) knownNeighbor.knownNeighborCount += 1;
        } else {
          mineNeighbors.push({
            row: neighbor.row,
            column: neighbor.column,
            knownNeighborCount: 1,
          });
        }
      });
    });
    console.log(`mineNeighborssss ${mineNeighbors}`)
    return mineNeighbors;
  };

  const retrieveSquareNeighborhoodMineCount = (
    squareId: { row: number; column: number },
    mineNeighbors: { row: number; column: number; knownNeighborCount: number }[]
  ) => {
    const squareNeighborhoodMineCount = mineNeighbors.find(
      (neighbor) =>
        neighbor.row === squareId.row && neighbor.column === squareId.column
    );
    if (squareNeighborhoodMineCount) {
      return squareNeighborhoodMineCount.knownNeighborCount;
    } else {
      return null;
    }
  };

  //
console.log(JSON.stringify(identifiedMineNeighbors(mineLocations, {rowCount: rowCount, columnCount: columnCount})))

  //construct game board based on row and column count, return array of rows and squares with ids
  const boardBuilder = () => {
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        row.push(
          <Square
            key={columnIndex}
            isAMineSquare={mineLocations.some((mine) => {
              return mine.row === rowIndex && mine.column === columnIndex;
            })}
            isFlagged={false}
            isSquareOpen={false}
            // numberOfAdjacentMines={identifiedMineNeighbors.}
            numberOfAdjacentMines={retrieveSquareNeighborhoodMineCount({ row: rowIndex, column: columnIndex }, identifiedMineNeighbors(mineLocations, {rowCount: rowCount, columnCount: columnCount
            }))}
            squareId={{ row: rowIndex, column: columnIndex }}
          />
        );
      }
      board.push(<Row key={rowIndex}>{row}</Row>);
    }
    return board;
  };

  const gameBoard = boardBuilder();

  return <>{gameBoard}</>;
};

export default GameBoard;


