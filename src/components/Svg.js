import React from 'react';
import * as d3 from 'd3';

class Svg extends React.Component {

  componentDidMount() {

    const { _id, dataPoints } = this.props;

    const sum = dataPoints.reduce((acc, x) => acc + x.value, 0);

    console.log('sum =', sum);

    const width = 400,
      height = 400,
      radius = width / 4;

    const pie = d3.pie().value(d => d.value);

    const piedata = pie(dataPoints);

    const fader = color => d3.interpolateRgb(color, '#fff')(0.2),
      color = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius - 7);

    // Create svg element
    const svg = d3.select('#id' + _id)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Tick marks
    const ticks = svg.selectAll('line')
      .data(piedata)
      .enter()
      .append('line');

    ticks.attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', -radius + 10)
      .attr('y2', -radius - 20)
      .attr('stroke', 'white')
      .attr('transform', d => `rotate(${(d.startAngle + d.endAngle) / 2 * (180 / Math.PI)})`);

    // Labels
    const labels = svg.selectAll('text')
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
      .text(d => `${d.data.label.length > 10 ? d.data.label.substring(0,10)+'...' : d.data.label}`);

    // Piechart
    const path = svg.selectAll('path')
      .data(piedata)
      .enter()
      .append('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc);

    // Values
    const values = svg
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

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

    path
      .on('mouseover', d => {
        const mx = d3.event.pageX;
        tooltip.transition().duration(200).style('opacity', 0.9);sum
        tooltip
          .html(`${d.data.label}<br/>Votes: ${d.data.value} (${+(d.data.value * 100 / sum).toFixed(2)}%)`)
          .style('left', mx < 100 ? mx + 'px' : mx - 100 + 'px')
          .style('top', d3.event.pageY + 'px')
          .attr('data-value', d.data.value);
      })
      .on('mouseout', d => {
        tooltip.transition().duration(500).style('opacity', 0);
      });
  }

  render() {
    const { _id, dataPoints } = this.props;
    return <svg className = 'Svg' id = {'id' + _id} />;
  }

}

export default Svg;

/*

    const path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const arc = g.selectAll('.arc')
      .data(pie(dataPoints))
      .enter().append('g')
      .attr('class', 'arc');

    arc.append('path')
      .attr('d', path)
      .attr('fill', function(d) {
        return color(d.data.label);
      });

    arc.append('text')
      .attr('transform', function(d) {
        return 'translate(' + label.centroid(d) + ')';
      })
      .attr('dy', '0.35em')
      .text(function(d) {
        return d.data.label;
      });
 */