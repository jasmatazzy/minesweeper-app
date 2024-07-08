import React, { useState, ChangeEvent } from "react";
import Row from "../../components/Row/index";
import Square from "../../components/Square/index";

const Board = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [mineSquareArray, setMineSquareArray] = useState<string[]>([]);
  const [adjacentMinesArray, setAdjacentMinesArray] = useState<string[]>([]);
  const [numOfRows, setNumOfRows] = useState(10);
  const [numOfColumns, setNumOfColumns] = useState(10);
  const [numOfMines, setNumOfMines] = useState(
    Math.floor(numOfRows * numOfColumns * 0.2)
  );
  const totalNumOfSquares = numOfRows * numOfColumns;

  const autoAdjustMines = (numOfRows: number, numOfColumns: number) => {
    if (numOfMines > numOfRows * numOfColumns) {
      setNumOfMines(Math.floor(numOfRows * numOfColumns * 0.2));
    }
    setNumOfMines(Math.floor(numOfRows * numOfColumns * 0.2));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "rows") {
      setNumOfRows(Number(value));
    } else if (name === "columns") {
      setNumOfColumns(Number(value));
    } else if (name === "mines") {
      setNumOfMines(Number(value));
    }
    if (name !== "mines") {
      autoAdjustMines(Number(value), numOfColumns);
    }
  };

  const randomizedSquaresWithMines = (
    numOfRows: number,
    numOfColumns: number,
    numOfMines: number
  ) => {
    const squaresWithMinesArray: string[] = [];
    while (squaresWithMinesArray.length < numOfMines) {
      const randomSquareId: string = `${Math.floor(
        Math.random() * numOfRows
      )}.${Math.floor(Math.random() * numOfColumns)}`;
      if (!squaresWithMinesArray.includes(randomSquareId)) {
        squaresWithMinesArray.push(randomSquareId);
      }
    }
    setMineSquareArray(squaresWithMinesArray);
  }

  const isAMineSquare = (i: number, j: number) =>
    mineSquareArray.includes(`${i}.${j}`);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => {
            setIsGameStarted(!isGameStarted);
            {
              !isGameStarted &&
                randomizedSquaresWithMines(numOfRows, numOfColumns, numOfMines);
            }
            {
              isGameStarted && randomizedSquaresWithMines(0, 0, 0);
            }
          }}
          style={{
            marginBottom: "10px",
            borderRadius: "5px",
            padding: "5px",
            backgroundColor:
              isGameStarted && numOfColumns > 0 && numOfRows > 0
                ? "red"
                : "green",
            color: "white",
            width: "100px",
          }}
        >
          {isGameStarted ? "Start Over" : "Start"}
        </button>
        <div>
          <label>Rows: </label>
          <input
            type="number"
            name="rows"
            value={numOfRows}
            onChange={handleInputChange}
            readOnly={isGameStarted}
          />
        </div>
        <div>
          <label>Columns: </label>
          <input
            type="number"
            name="columns"
            value={numOfColumns}
            onChange={handleInputChange}
            readOnly={isGameStarted}
          />
        </div>
        <div>
          <label>Total Mines: </label>
          <input
            type="number"
            name="mines"
            value={numOfMines}
            onChange={handleInputChange}
            readOnly={isGameStarted}
          />
          <label>
            {" "}
            <br /> Total Squares: {totalNumOfSquares}
          </label>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {Array.from({ length: numOfRows }).map((_, i) => (
          <Row key={i}>
            {Array.from({ length: numOfColumns }).map((_, j) => (
              <Square
                key={j}
                randomNumber={Math.floor(Math.random() * 8) + 1}
                row_id={i}
                column_id={j}
                square_id={`${i}.${j}`}
                isAMineSquare={isAMineSquare(i, j)}
              />
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
};

export default Board;
