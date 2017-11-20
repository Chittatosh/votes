import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Svg extends React.Component {
  constructor(props) {
    super(props);

    this.d3run = this.d3run.bind(this);
  }

  d3run() {

    const { _id, dataPoints } = this.props;

    const sum = dataPoints.reduce((acc, x) => acc + x.value, 0);

    const svg = d3.select('#id' + _id),
      width = +svg.attr('width'),
      height = +svg.attr('height'),
      radius = width / 4;

    svg.selectAll('*').remove();

    const pie = d3.pie().value(d => d.value);

    const piedata = pie(dataPoints);

    const fader = color => d3.interpolateRgb(color, '#fff')(0.2),
      color = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius - 7);

    // Create svg g element
    const gElement = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Tick marks
    const ticks = gElement.selectAll('line')
      .data(piedata)
      .enter()
      .append('line');

    ticks.attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', -radius + 10)
      .attr('y2', d => {
        if (d.data.value && (d.data.value * 100 / sum) >= 5)
          return -radius - 20;
        else
          return -radius + 10;
      })
      .attr('transform', d => `rotate(${(d.startAngle + d.endAngle) / 2 * (180 / Math.PI)})`);

    // Labels
    const labels = gElement.selectAll('text')
      .data(piedata)
      .enter()
      .append('text');

    labels.attr('class', 'label')
      .attr('transform', d => {
        const dist = radius + 50,
          angle = (d.startAngle + d.endAngle) / 2, // Middle of wedge
          x = dist * Math.sin(angle),
          y = -dist * Math.cos(angle);
        return `translate(${x}, ${y})`;
      })
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => {
        if (d.data.value && (d.data.value * 100 / sum) >= 5)
          return `${d.data.label.length > 14 ? d.data.label.substring(0,11)+'...' : d.data.label}`;
        else
          return null;
      });

    // Piechart
    const path = gElement.selectAll('path')
      .data(piedata)
      .enter()
      .append('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc);

    // Values
    const values = gElement
      .append('g').selectAll('text')
      .data(piedata)
      .enter()
      .append('text');

    values.attr('class', 'value')
      .attr('transform', d => {
        const dist = radius - 20,
          angle = (d.startAngle + d.endAngle) / 2, // Middle of wedge
          x = dist * Math.sin(angle),
          y = -dist * Math.cos(angle);
        return `translate(${x}, ${y})`;
      })
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => `${d.data.value}`);

    d3.select('#tooltip' + _id).remove();

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', 'tooltip' + _id)
      .attr('class', 'tooltip')
      .style('opacity', 0);

    path
      .on('mouseover', d => {
        const mx = d3.event.pageX;
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`${d.data.label}<br/>Votes: ${d.data.value} (${+(d.data.value * 100 / sum).toFixed(2)}%)`)
          .style('left', mx < 100 ? mx + 'px' : mx - 100 + 'px')
          .style('top', d3.event.pageY + 'px')
          .attr('data-value', d.data.value);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });
  }

  componentDidMount() {
    this.d3run();
  }

  componentDidUpdate() {
    this.d3run();
  }

  render() {
    const { _id } = this.props;
    return <svg className = 'Svg' id = {'id' + _id} width='350' height='300' />;
  }

}

Svg.propTypes = {
  _id: PropTypes.string.isRequired,
  dataPoints: PropTypes.array.isRequired
};

export default Svg;
