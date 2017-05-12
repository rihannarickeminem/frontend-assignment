import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const markerSource = {
  beginDrag(props) {
    console.log('asfsa ', props);
    debugger;
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Maker extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    const { y, x } = this.props;
    debugger;
    // return connectDragSource(
    return (
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

        // opacity: isDragging ? 0.5 : 1,
// Maker.propTypes = {
//   connectDragSource: PropTypes.func.isRequired,
//   isDragging: PropTypes.bool.isRequired
// };

export default DragSource('Marker', markerSource, collect)(Maker);
