import React from 'react';
import * as d3 from "d3";

class Svg extends React.Component {
  
  componentDidMount() {
    const svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const fader = color => d3.interpolateRgb(color, "#fff")(0.2),
      color = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    const pie = d3.pie()
        .value(function(d) { return d.value; });

    const path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    const label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    d3.json("api/poll/59f7606596472a3eb07322b9", (error, data) => {
      if (error) throw error;
      console.log('data = ', data);

      const arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      arc.append("path")
          .attr("d", path)
          .attr("fill", function(d) { return color(d.data.label); });

      arc.append("text")
          .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
          .attr("dy", "0.35em")
          .text(function(d) { return d.data.label; });
      
      const tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);
      
      arc
        .on("mouseover", d => {
          const mx = d3.event.pageX;
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(
              `${d.data.name}<br/>$${d.data.value
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
            )
            .style("left", mx < 100 ? mx + "px" : mx - 100 + "px")
            .style("top", d3.event.pageY + "px")
            .attr("data-value", d.data.value);
        })
        .on("mouseout", d => {
          tooltip.transition().duration(500).style("opacity", 0);
        });
    });
  }
  
  render() {
    return <svg width="400" height="400"></svg>;
  }
  
}

export default Svg;