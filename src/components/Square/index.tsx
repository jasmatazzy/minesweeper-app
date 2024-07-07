import React from "react";
import "./style.css";

const Square = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        // border: "1px solid black",
      }}
    >
      <button
        className="pushable button"
        >
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front"></span>
      </button>
    </div>
  );
};

export default Square;
