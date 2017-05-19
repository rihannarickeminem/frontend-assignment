import React, {Component} from 'react'
import classes from '../Grid.scss'
import Marker from '../cheese/Marker';

export default class RequiredXYs extends Component {
  render() {
    let props = this.props;
    return (
      <ul>
        {Object.keys(props.gridParams.requiredXYs)
            .map(key =>
              <li key={key} className={classes['requiredXYs']}>
                <Marker requiredXY={
                    Object.assign({},
                      props.gridParams.requiredXYs[key],
                      { marKey: key}
                    )
                }
                x={props.gridParams.requiredXYs[key].x}
                y={props.gridParams.requiredXYs[key].y} />
              </li>
            )}
          </ul>
    );
  }
}
