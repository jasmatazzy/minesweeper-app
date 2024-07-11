interface squareNeighborLookupProps {
    squareRow: number;
    squareColumn: number;
    totalRows: number;
    totalColumns: number;
  }
  const squareNeighborLookup = (squareRow:number, squareColumn:number, totalRows:number, totalColumns:number): ({row:number, column:number}[]) => {
    // const { squareRow, squareColumn, totalRows, totalColumns } = props;
  
    let existingNeighbors: {row:number, column:number}[] = []
  
    //topLeft: compare squareRow and squareColumn coordinates to squareRow-1 and squareColumn-1 to ensure 1) are both positive 2) square is not greater than number of squares in row 3) row is not greater than number of rows
    const topLeftExists =
      squareRow - 1 >= 0 &&
      squareColumn - 1 >= 0 &&
      squareColumn - 1 < totalColumns &&
      squareRow - 1 < totalRows;
    const topExists = squareRow - 1 >= 0 && squareRow - 1 < totalRows;
    const topRightExists =
      squareRow - 1 >= 0 &&
      squareColumn + 1 < totalColumns &&
      squareRow - 1 < totalRows;
    const leftExists = squareColumn - 1 >= 0 && squareColumn - 1 < totalColumns;
    const rightExists = squareColumn + 1 < totalColumns && squareColumn + 1 >= 0;
    const bottomLeftExists =
      squareRow + 1 < totalRows &&
      squareColumn - 1 >= 0 &&
      squareColumn - 1 < totalColumns;
    const bottomExists = squareRow + 1 < totalRows && squareRow + 1 >= 0;
    const bottomRightExists =
      squareRow + 1 < totalRows &&
      squareColumn + 1 < totalColumns &&
      squareRow + 1 >= 0;
  
  topLeftExists && existingNeighbors.push({row: squareRow - 1, column: squareColumn - 1 });
  topExists && existingNeighbors.push({row: squareRow - 1, column: squareColumn });
  topRightExists && existingNeighbors.push({row: squareRow - 1, column: squareColumn + 1 });
  leftExists && existingNeighbors.push({row: squareRow, column: squareColumn - 1 });
  rightExists && existingNeighbors.push({row: squareRow, column: squareColumn + 1 });
  bottomLeftExists && existingNeighbors.push({row: squareRow + 1, column: squareColumn - 1 });
  bottomExists && existingNeighbors.push({row: squareRow + 1, column: squareColumn });
  bottomRightExists && existingNeighbors.push({row: squareRow +1, column: squareColumn + 1 });
  
    return existingNeighbors
  };
  
  export default squareNeighborLookup;
  