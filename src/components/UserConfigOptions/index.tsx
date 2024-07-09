import React from "react";

interface UserConfigOptionsProps {
  isGameStarted: boolean;
  numberOfMines: number;
  numberOfRows: number;
  numberOfSquares: number;
  totalSquares: number;
  setIsGameStarted: (value: boolean) => void;
  setNumberOfSquares: (value: number) => void;
  setNumberOfMines: (value: number) => void;
  setNumberOfRows: (value: number) => void;
}
const UserConfigOptions: React.FC<UserConfigOptionsProps> = ({
  isGameStarted,
  numberOfMines,
  numberOfRows,
  numberOfSquares,
  totalSquares,
  setIsGameStarted,
  setNumberOfSquares,
  setNumberOfMines,
  setNumberOfRows,
}) => {
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
            setIsGameStarted(true);
          }}
          style={{
            marginBottom: "10px",
            borderRadius: "5px",
            padding: "5px",
            backgroundColor: "green",
            color: "white",
            width: "100px",
          }}
        >
          "Start"
        </button>
        <div>
          <label>Rows: </label>
          <input
            type="number"
            name="rows"
            value={numberOfRows || 0}
            onChange={(e) => {
              setNumberOfRows(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <label>Columns: </label>
          <input
            type="number"
            name="columns"
            value={numberOfSquares || 0}
            onChange={(e) => {
              setNumberOfSquares(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <label>Total Mines: </label>
          <input
            type="number"
            name="mines"
            value={numberOfMines || 0}
            onChange={(e) => {
              setNumberOfMines(parseInt(e.target.value));
            }}
          />
          <label>
            {" "}
            <br /> Total Squares: {numberOfSquares || `You need at least 1 row and 1 column to start the game`}
          </label>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      ></div>
    </div>
  );
};

export default UserConfigOptions;
