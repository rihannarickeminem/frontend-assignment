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
    const { connectDragSource,
      isDragging,
      forGrid,
      requiredXY,
      rightPosition,
      x,y} = this.props;
    let cellClasses;
    if(forGrid){
      cellClasses = classes['wrongCell'];
    }
    if(rightPosition){
      cellClasses = classes['rightCell'];
    }
    let text = forGrid ?
      (<div>
        ♗ <span style={{
          fontSize: '10px',
          position: 'absolute',
          right: '0px',
          top: '-2px',
        }}>
          {requiredXY.x},{requiredXY.y}
        </span>
       </div>) :
      `♗ x: ${x}, y: ${y} `;
    return connectDragSource(
      <div className={cellClasses}
        style={markerStyle}>
        {text}
      </div>
    );
  }
}

export default DragSource('Marker', markerSource, collect)(Marker);
