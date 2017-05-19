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
        <BoardSquare {...this.props} x={X} y={Y}>
          {this.renderMark(X, Y)}
        </BoardSquare>
      </div>
    );
  }
  renderMark(X, Y) {
    let { setMarkPosition, gridParams: { requiredXYs } } = this.props;
    let whichMarkHere = Object.values(requiredXYs).filter(marker => {
      return marker.placedX === X && marker.placedY === Y;
    });
    if(whichMarkHere.length === 1){
      let rightPosition = whichMarkHere[0].x === X &&
        whichMarkHere[0].y === Y;
      return <Marker setMarkPosition={setMarkPosition}
        requiredXY={whichMarkHere[0]}
        forGrid={true}
        rightPosition={rightPosition}
      />;
    }
    return null;
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
