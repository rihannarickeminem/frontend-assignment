import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import classes from '../Grid.scss'

const markerSource = {
  beginDrag(props) {
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
let markerStyle = {
  opacity:  1,
  fontSize: 20,
  fontWeight: 'bold',
  cursor: 'move',
}

class Marker extends Component {
  render() {
    // let markerStyle = markerStyle;
    const { connectDragSource,
      isDragging,
      forGrid,
      rightPosition,
      x,y} = this.props;
    let cellClasses;
    if(forGrid){
      cellClasses = classes['wrongCell'];
    }
    if(rightPosition){
      cellClasses = classes['rightCell'];
    }
    return connectDragSource(
      <div className={cellClasses}
        style={markerStyle}>
      {forGrid ?
          `♗` :
          `♗ x: ${x}, y: ${y} ` }
      </div>
    );
  }
}

export default DragSource('Marker', markerSource, collect)(Marker);
