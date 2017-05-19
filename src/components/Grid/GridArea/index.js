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
    this.state = {
      width: this.props.width,
      height: this.props.height,
      svgId: this.props.svgId,
      showCheckScreen: false,
    };
    this.toggleShowCheckScreen = this.toggleShowCheckScreen.bind(this);
  }
  toggleShowCheckScreen(){
    this.setState({
      ...this.state,
      showCheckScreen: !this.state.showCheckScreen,
    });
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

    let marks = Object.values(this.props.gridParams.requiredXYs);
    let placedMarks = Object.values(marks)
      .filter(marker => {
      return marker.placedX !== undefined && marker.placedY !== undefined;
    });
    let enableCheck = placedMarks.length === 4;
    let everythingCorrect = Object.values(marks)
      .filter(marker => {
        return marker.x === marker.placedX &&
                  marker.y === marker.placedY;
    }).length === 4;
    let checkButtonClass = enableCheck ?
      'enabled-button' : 'disabled-button';
    let checkScreenClass =  everythingCorrect ?
      'placed-correctly' : 'placed-uncorrectly';
    const wtshow = this.state.showCheckScreen ?
      (
        <div 
          className={classes[checkScreenClass]}
          style={{
            padding: '20px 20px',
            height: '100%',
            borderRadius: "5px",
            cursor: 'pointer',
            textAlign: 'center',
            fontSize: '50px',
          }}
          onClick={this.toggleShowCheckScreen}
        >
          {everythingCorrect ? 'Correct !!!' : 'Uncorrect !!!' }
        </div>
      )
      :( <div>
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
    <GridDrop {...this.props}/>
        </div>
        <div onClick={this.toggleShowCheckScreen}
        style={{
          padding: '5px 15px',
          width: '400px',
          borderRadius: "5px",
          cursor: 'pointer',
        }}
        className={classes[checkButtonClass]}>
        Check
      </div>
      </div>);
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        {wtshow}
      </div>
    );
  }
};
GridArea.defaultProps = {
  width: 400,
  height: 300,
  svgId: 'v1_chart'
};

