import React, {Component} from 'react'
import GridArea from './GridArea';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RequiredXYs from './Markers';

import classes from './Grid.scss'

@DragDropContext(HTML5Backend)
export default class GridWrapper extends Component {
  render() {
    const props = this.props;
    return (
      <div className={classes['grid-container']}>
        <div className={classes['left-sidebar']}>
          <RequiredXYs {...props}/>
        </div>
        <div className={classes['main-content']}>
          <GridArea/>
        </div>
      </div>
    )
  }
}
