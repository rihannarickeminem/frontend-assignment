import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

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

class Marker extends Component {
  render() {
    const { connectDragSource,
      isDragging,
      forGrid,
      setMarkPosition,
      x,y} = this.props;
    return connectDragSource(
      <div style={{
        opacity:  1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
      {forGrid ?
          `♗` :
          `♗ x: ${x}, y: ${y} ` }
      </div>
    );
  }
}

export default DragSource('Marker', markerSource, collect)(Marker);
