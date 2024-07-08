import React from "react";

interface UserConfigOptionsProps {
  isGameStarted: boolean;
  numOfColumns: number;
  numOfMines: number;
  numOfRows: number;
  numOfSquares: number;
  setIsGameStarted: (value: boolean) => void;
  setNumOfColumns: (value: number) => void;
  setNumOfMines: (value: number) => void;
  setNumOfRows: (value: number) => void;
}
const UserConfigOptions: React.FC<UserConfigOptionsProps> = ({
  isGameStarted,
  numOfColumns,
  numOfMines,
  numOfRows,
  numOfSquares,
  setIsGameStarted,
  setNumOfColumns,
  setNumOfMines,
  setNumOfRows,
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
            value={numOfRows || 0}
            onChange={(e) => {
              setNumOfRows(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <label>Columns: </label>
          <input
            type="number"
            name="columns"
            value={numOfColumns || 0}
            onChange={(e) => {
              setNumOfColumns(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <label>Total Mines: </label>
          <input
            type="number"
            name="mines"
            value={numOfMines || 0}
            onChange={(e) => {
              setNumOfMines(parseInt(e.target.value));
            }}
          />
          <label>
            {" "}
            <br /> Total Squares: {numOfSquares || `You need at least 1 row and 1 column to start the game`}
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
