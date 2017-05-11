import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Square from './Square';
import BoardSquare from './BoardSquare';
import classes from '../Grid.scss'

@DragDropContext(HTML5Backend)
export default class Board extends Component {
  renderSquare(i) {
    const x = i % 10;
    const y = Math.floor(i / 10);
    const black = (x + y) % 2 === 1;

    // const [knightX, knightY] = this.props.knightPosition={[7, 4]};
    // const piece = (x === 7 && y === 4) ?
    //   <Knight /> :
    //   null;

    return (
      <div key={i}
           style={{ width: '10%', height: '10%' }}>
        <Square black={black}>
        </Square>
      </div>
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 100; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div className={classes["front-board"]}>
        {squares}
      </div>
    );
  }
}
// export default DragDropContext(HTML5Backend)(Board);
