import React, { Component } from 'react'
import Square from '../../components/Square/index'

const Main = (): JSX.Element  => {
  return (
    <div>
      <div>I Guess This Is Minesweeper</div>
      <div className='board'
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          width: "15vw",
        }}
      >
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  )
}

export default Main