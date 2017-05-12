import { DragDropContext } from 'react-dnd';
import React, {Component} from 'react'
import HTML5Backend from 'react-dnd-html5-backend';
import classes from '../Grid.scss'
import Marker from '../cheese/Marker';

@DragDropContext(HTML5Backend)
export default class RequiredXYs extends Component {
  render() {
    let props = this.props;
    return (
      <ul>
        {Object.keys(props.gridParams.requiredXYs)
            .map(key =>
              <li key={key} className={classes['requiredXYs']}>
                <Marker x={props.gridParams.requiredXYs[key].x}
                  y={props.gridParams.requiredXYs[key].y} />
              </li>
            )}
          </ul>
    );
  }
}
