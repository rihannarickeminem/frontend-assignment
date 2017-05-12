import React, { Component } from 'react';
import BoardSquare from './BoardSquare';
import classes from '../Grid.scss'
import Marker from './Marker';

export default class Board extends Component {
  renderSquare(i) {
    const X = i % 10;
    const Y = 9 - Math.floor(i / 10);

    return (
      <div key={i} style={{ width: '10%', height: '10%' }}>
        <BoardSquare x={X} y={Y}>
          {this.renderMark(X, Y)}
        </BoardSquare>
      </div>
    );
  }
  renderMark(X, Y) {
    const { x: markX, y: markY } = this.props.markParams;
    const isMarkHere = X === markX && Y === markY;
    return isMarkHere ? <Marker /> : null;
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
