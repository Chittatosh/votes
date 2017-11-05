import React from 'react';
import * as d3 from 'd3';

class Svg extends React.Component {
  componentDidMount() {
    const {
      _id,
      dataPoints
    } = this.props;
    /*
    console.log('dataPoints =', dataPoints);
     */
    const svg = d3.select('#id' + _id),
      width = +svg.attr('width'),
      height = +svg.attr('height'),
      radius = Math.min(width, height) / 2,
      g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const fader = color => d3.interpolateRgb(color, '#fff')(0.2),
      color = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    const pie = d3.pie()
      .value(function(d) {
        return d.value;
      });

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

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

    arc
      .on('mouseover', d => {
        const mx = d3.event.pageX;
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`${d.data.label}<br/>Votes: ${d.data.value}`)
          .style('left', mx < 100 ? mx + 'px' : mx - 100 + 'px')
          .style('top', d3.event.pageY + 'px')
          .attr('data-value', d.data.value);
      })
      .on('mouseout', d => {
        tooltip.transition().duration(500).style('opacity', 0);
      });
  }

  render() {
    const {
      _id,
      dataPoints
    } = this.props;
    return <svg width = '300'
    height = '300'
    className = 'Svg'
    id = {
      'id' + _id
    } > < /svg>;
  }

}

export default Svg;