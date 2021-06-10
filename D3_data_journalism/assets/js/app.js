// @TODO: YOUR CODE HERE!

// Import the CSV and differentiate poverty and healthcare for use as axes.
d3.csv('assets/data/data.csv').then(function(data) {
  data.forEach(d => {
      d.poverty = +d.poverty;
      d.healthcare = +d.healthcare;
  });

// Generate SVG block
var margin = {top: 40, right: 40, bottom: 60, left: 60},
  width = 800 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

var svg = d3.select('#scatter')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform','translate(' + margin.left + ',' + margin.top + ')');

// Create axes
  var x = d3.scaleLinear()
      .domain(d3.extent(data.map(d => d.poverty)))
      .range([0, width]);
      svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
       .domain(d3.extent(data, d => d.healthcare))
       .range([height, 0]);
       svg.append('g')
       .call(d3.axisLeft(y));

// Create Labels
      svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .text('Poverty (%)');

      svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('x', (height / 2) * -1)
      .attr('dy', -40)
      .text('Healthcare (%)');

// Make Dots
  var gdots = svg.selectAll('g.dot')
      .data(data)
      .enter()
      .append('g');

  gdots.append('circle')
      .attr('cx', d => x(d.poverty))
      .attr('cy', d => y(d.healthcare))
      .attr('r', 9)
      .style('fill', '#83BBD2');
  
  gdots.append('text')
      .text(d => d.abbr)
      .attr('x', d => x(d.poverty))
      .attr('y', d => y(d.healthcare))
      .attr('dx', -6)
      .attr('dy', 3)
      .style('font-size', '9px');

})