import React, {Component} from 'react'
import GridArea from './GridArea';
import Marker from './cheese/Marker';
import RequiredXYs from './Markers';

import classes from './Grid.scss'

export const GridWrapper = (props) => {
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

export default GridWrapper
