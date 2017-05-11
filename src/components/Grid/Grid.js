import React from 'react'

import classes from './Grid.scss'
import * as d3 from "d3";
const Xgrid = require('react-d3-core').Xgrid;
const Ygrid = require('react-d3-core').Ygrid;

export const GridWrapper = (props) => {
	const requiredXYs = <ul>
		{Object.keys(props.gridParams.requiredXYs)
				.map(key =>
					<li key={key} className={classes['requiredXYs']}>
						x: {props.gridParams.requiredXYs[key].x},
						y: {props.gridParams.requiredXYs[key].y}</li>
				)}</ul>;

	let LineChart = React.createClass({

		propTypes: {
			width:React.PropTypes.number,
			height:React.PropTypes.number,
			chartId:React.PropTypes.string
		},

		getDefaultProps: function() {
			return {
				width: 400,
				height: 300,
				chartId: 'v1_chart'
			};
		},
		getInitialState:function(){
			return {
				width:this.props.width
			};
		},
		render: function(){
			let margin = {top: 5, right: 50, bottom: 20, left: 50},
				w = this.state.width - (margin.left + margin.right),
				h = this.props.height - (margin.top + margin.bottom);

			let generalGridData = [];
			let fieldSize = 40,
				boardDimension = 10,
				boardSize = boardDimension*fieldSize;
    
			for(let i = 0; i < boardDimension*boardDimension; i++) {
				generalGridData.push({
					x: i % boardDimension,
					y: Math.floor(i / boardDimension),
				});
			};
			let width = 400,
				height = 300,
				margins = {
					top: 20,
					left: 50,
					bottom: 30,
					right: 50,
				},
				gridAxisClassName = "grid-class",
				x = function(d) {
					return d.x;
				},
				xDomain = d3.extent(generalGridData, x),
				xRange = [20, width - margins.left - margins.right],
				xScale = 'linear',
				y = function(d) {
					return d.y;
				},
				yScale = 'linear',
				yDomain = d3.extent(generalGridData, y),
				yRange = [20, (height - margins.top - margins.bottom)];

			let transform='translate(' + margins.left + ',' + margins.top + ')';

			return (
					<svg id={this.props.chartId} width={this.state.width} height={this.props.height}>
						<g transform={transform}>
							<Xgrid
								width={width}
								height={height}
								margins={margins}
								type={'x'}
								gridAxisClassName={gridAxisClassName}
								x={x}
								xDomain={xDomain}
								xRange={xRange}
								xScale={xScale}
								yScale={yScale}
							/>
							<Ygrid
								width={width}
								height={height}
								margins={margins}
								type={'y'}
								gridAxisClassName= {gridAxisClassName}
								y={y}
								yDomain={yDomain}
								yRange={yRange}
								yScale={yScale}
								xScale={xScale}
							/>
					  </g>
					</svg>
			);
		}
	});

	return (
		<div className={classes['grid-container']}>
			<div className={classes['left-sidebar']}>
				{requiredXYs}
			</div>
			<div className={classes['main-content']}>
				<LineChart/>
			</div>
		</div>
	)
}

export default GridWrapper
