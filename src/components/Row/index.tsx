import React, { PropsWithChildren } from "react";
import Square from "../Square";

const NUM_OF_COLUMNS: number = 10;

const someArray = Array(10);

const Row = ({children}: PropsWithChildren) => {
  return (
    <div style={{ display: "flex" }}>
      {children}
    </div>
  );
};

export default Row;
