import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const markerSource = {
  beginDrag(props) {
    debugger;
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Marker extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    const { y, x } = this.props;
    return connectDragSource(
      <div style={{
        opacity:  1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        ♗ x: {x}, y: {y} 
      </div>
    );
  }
}

export default DragSource('Marker', markerSource, collect)(Marker);
