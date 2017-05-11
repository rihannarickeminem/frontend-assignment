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
	updateDimensions() {
		// this.setState({width: $(window).width(), height: $(window).height()});
	}

	componentWillMount() {
		this.updateDimensions();
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
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
		// row.each
		// .each(function(d) {
		// 	console.log('as43y 3', d)
		// });
			// .data(function(d) {
			// 	return d; })
			// .append("text")
			// .attr("x", function(d) { return d.x; })
			// .attr("y", function(d) { return d.y; })
			// .text(function(d) { return d["data-name"]; })
			// .text(function(d) {
 // return d["data-name"]; })
		// .each(function(d) {
			// console.log('as43y 3', d)
		// });

		// var text = row.selectAll("text")
		// // 	.data(gridData)
		// 	.enter()
		// 	.append("text");
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
				<LineChart/>
			</div>
		</div>
	)
}

export default GridWrapper
