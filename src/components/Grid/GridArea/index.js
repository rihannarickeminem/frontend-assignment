import React, {Component} from 'react'
import * as d3 from "d3";
import Square from '../cheese/Square';
import GridDrop from '../cheese/GridDrop';
import classes from '../Grid.scss'

const Xgrid = require('react-d3-core').Xgrid;
const Ygrid = require('react-d3-core').Ygrid;

export default class GridArea extends Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      width: this.props.width,
      height: this.props.height,
      svgId: this.props.svgId,
    };
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
        <div className={classes['my-svg-container']}>
          <svg id={this.props.svgId} className={classes['my-svg']} width={this.state.width} height={this.props.height}>
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
          <GridDrop gridParams={this.props.gridParams}/>
        </div>
      </div>
    );
  }
};
GridArea.defaultProps = {
  width: 400,
  height: 300,
  svgId: 'v1_chart'
};

