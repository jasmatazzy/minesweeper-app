import React, { PropsWithChildren } from "react";

const Row = ({children}: PropsWithChildren) => {
  return (
    <div style={{ display: "flex" }}>
      {children}
    </div>
  );
};

export default Row;
