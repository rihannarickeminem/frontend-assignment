import React, { Component } from 'react';
import BoardSquare from './BoardSquare';
import classes from '../Grid.scss'
import Marker from './Marker';

export default class Board extends Component {
  renderSquare(i) {
    const X = i % 10;
    const Y = 9 - Math.floor(i / 10);
    console.log('renderSquare');

    return (
      <div key={i} style={{ width: '10%', height: '10%' }}>
        <BoardSquare {...this.props} x={X} y={Y}>
          {this.renderMark(X, Y)}
        </BoardSquare>
      </div>
    );
  }
  renderMark(X, Y) {
    // let { setMarkPosition } = this.props;
    let { setMarkPosition, gridParams: { requiredXYs } } = this.props;
    let whichMarkHere = Object.values(requiredXYs).filter(marker => {
      if(marker.placedX === X && marker.placedY === Y){
      console.log('marker.placedX === X && marker.placedY === Y ', marker.placedX === X && marker.placedY === Y);
      }
      return marker.placedX === X && marker.placedY === Y;
    });
    if(whichMarkHere.length === 1){
      // debugger;
    }
    return whichMarkHere.length === 1 ?
      <Marker setMarkPosition={setMarkPosition}
        whichMarkHere={whichMarkHere}
        forGrid={true}/> : null;
  }

  render() {
    const squares = [];
    console.log('this.props 2222 ', this.props.gridParams.requiredXYs[1]);
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
