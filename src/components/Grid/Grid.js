import React, {Component} from 'react'
import GridArea from './GridArea';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RequiredXYs from './Markers';
import { observe } from './cheese/BoardSquare';

import classes from './Grid.scss'
@DragDropContext(HTML5Backend)
export default class GridWrapper extends Component {
  constructor(props) {
    super(props);
    this.unobserve = observe(this.handleChange.bind(this));
  }

  handleChange(knightPosition) {
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.unobserve();
  }

  render() {
    const props = this.props;
    return (
      <div className={classes['grid-container']}>
        <div className={classes['left-sidebar']}>
          <RequiredXYs {...props}/>
        </div>
        <div className={classes['main-content']}>
          <GridArea {...props}/>
        </div>
      </div>
    )
  }
}
