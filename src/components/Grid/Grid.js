import React, {Component} from 'react'

import classes from './Grid.scss'
import * as d3 from "d3";
import Square from './cheese/Square';
import GridDrop from './cheese/GridDrop';
// import Board from './cheese/Board';
const Xgrid = require('react-d3-core').Xgrid;
const Ygrid = require('react-d3-core').Ygrid;

class GridArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
      svgId: this.props.svgId,
      gridDropTop: this.props.gridDropTop,
      gridDropLeft: this.props.gridDropLeft,
    };
  }
  onResize(){
    console.log('awegawg aw ');
    const item = document.getElementById(this.state.svgId);
    const rect = item.getBoundingClientRect();
    console.log('sadfas ', rect)
  }

  componentDidMount() {
    const item = document.getElementById(this.props.svgId);
    const svgHeight = item.clientHeight;
    const rect = item.getBoundingClientRect();
    window.addEventListener("resize", this.onResize.bind(this));
    this.setState({
      gridDropTop: rect.top,
      gridDropLeft: rect.left,
    });

    console.log('sadfas ', svgHeight)
    console.log('sadfas ', rect)
    // window.addEventListener("resize", this.updateDimensions);
  }

  render() {
    let generalGridData = [];
    let fieldSize = 40,
      boardDimension = 11,
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
      xRange = [0, width - margins.left - margins.right],
      xScale = 'linear',
      y = function(d) {
        return d.y;
      },
      yScale = 'linear',
      yDomain = d3.extent(generalGridData, y),
      yRange = [(height - margins.top - margins.bottom), 0];

    let transform='translate(' + margins.left + ',' + margins.top + ')';

    return (
      <div>
        <div >
          <svg id={this.props.svgId} width={this.state.width} height={this.props.height}>
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
          <GridDrop gridDropTop={this.state.gridDropTop} gridDropLeft={this.state.gridDropLeft}/>
        </div>
      </div>
    );
  }
};
GridArea.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  svgId: React.PropTypes.string.isRequired,
  gridDropTop: React.PropTypes.string.isRequired,
  gridDropLeft: React.PropTypes.string.isRequired,
};
GridArea.defaultProps = {
  width: 400,
  height: 300,
  svgId: 'v1_chart',
  gridDropTop: '144px',
  gridDropLeft: '353px',
};

export const GridWrapper = (props) => {
	const requiredXYs = <ul>
		{Object.keys(props.gridParams.requiredXYs)
				.map(key =>
					<li key={key} className={classes['requiredXYs']}>
						x: {props.gridParams.requiredXYs[key].x},
						y: {props.gridParams.requiredXYs[key].y}</li>
				)}</ul>;

	return (
		<div className={classes['grid-container']}>
			<div className={classes['left-sidebar']}>
				{requiredXYs}
			</div>
			<div className={classes['main-content']}>
				<GridArea/>
			</div>
		</div>
	)
}

export default GridWrapper
