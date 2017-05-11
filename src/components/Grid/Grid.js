import React, { Component } from 'react'
import classes from './Grid.scss'
import * as d3 from "d3";
import Faux from 'react-faux-dom'

class LineChart extends Component {
	constructor(props) {
		super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
    };
	}
	getGridData() {
		let { width: widthMain,
			height: heightMain } = this.state;
		let data = [];
		let xpos = 1;
		let ypos = 1;
		let width = (widthMain-10)/10;
		let height = (heightMain-10)/10;

		for (var row = 0; row < 10; row++) {
			data.push( [] );
			for (var column = 0; column < 10; column++) {
				data[row].push({
					x: xpos,
					y: ypos,
					width: width,
					height: height
				})
				xpos += width;
			}
			xpos = 1;
			ypos += height; 
		}
		return data;
	}

	render() {
		var el = Faux.createElement('div')

		el.setAttribute('class', 'my-svg-container')
		el.setAttribute('id', 'grid')
		var gridData = this.getGridData(); 
		var grid = d3.select(el)
			.append("svg")
			.attr("class","my-svg")
			.attr("preserveAspectRatio","xMidYMin slice")
			.attr("viewBox","0 0 400 400")
			.append("g")
			.attr("transform","translate(0, 0)");
		var row = grid.selectAll(".row")
			.data(gridData)
			.enter().append("g")
			.attr("class", "row")
		var column = row.selectAll(".square")
			.data(function(d) {
				return d; })
			.enter().append("rect")
			.attr("class","square")
			.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; })
			.attr("width", function(d) { return d.width; })
			.attr("height", function(d) { return d.height; })
			.style("fill", "#fff")
			.style("stroke", "#222");

		return el.toReact()
	}
};
LineChart.propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    chartId: React.PropTypes.string
};
LineChart.defaultProps = {
	width: 250,
	height: 250,
	chartId: 'v1_chart'
};

class GridArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
      svgId: this.props.svgId,
    };
  }

  componentDidMount() {
    const item = document.getElementById(this.props.svgId);
    const svgHeight = item.clientHeight;
    const rect = item.getBoundingClientRect();
    console.log('sadfas ', svgHeight)
    console.log('sadfas ', rect)
    // window.addEventListener("resize", this.updateDimensions);
  }

  render() {
    let margin = {top: 5, right: 50, bottom: 20, left: 50},
      w = this.state.width - (margin.left + margin.right),
      h = this.props.height - (margin.top + margin.bottom);

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
          <GridDrop/>
        </div>
      </div>
    );
  }
};
GridArea.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  svgId: React.PropTypes.string
};
GridArea.defaultProps = {
  width: 400,
  height: 300,
  svgId: 'v1_chart'
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
