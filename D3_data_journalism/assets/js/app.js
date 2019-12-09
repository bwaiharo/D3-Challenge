// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function(Jdata) {

    
        console.log(Jdata);
   
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    Jdata.forEach(function(data) {
        data.healthcareLow = +data.healthcareLow;
        data.healthcare = +data.healthcare;
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.poverty = +data.poverty;
      });
  
      // Step 2: Create scale functions  
      // ==============================
      var xLinearScale = d3.scaleLinear()
      .domain([5, d3.max(Jdata, d => d.smokes)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([28, d3.max(Jdata, d => d.age)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

     // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

         // Step 5: Create Circles
    // ==============================
    // var circlesGroup = chartGroup.selectAll("circle")
    // .data(Jdata)
    // .enter()
    // .append("circle")
    // .attr("cx", d => xLinearScale(d.smokes))
    // .attr("cy", d => yLinearScale(d.age))
    // .attr("r", "15")
    // .attr("fill", "pink")
    // .attr("opacity", ".5");


    var node = svg.selectAll("g")
                .data(Jdata)
                .enter()
                .append("g");

node.append("circle")
  .attr("class", "dot")
  .attr("cx", d => xLinearScale(d.smokes))
    .attr("cy", d => yLinearScale(d.age))
  .attr("r", 15).attr("fill", "pink")
 .attr("opacity", ".5")
 .text(function(d) { return x(d.abbr); });

// node.append("text")
//   .attr("x", function(d) { return x(d.abbr); })
//   .attr("y", function(d) { return y(d.abbr); })
//   .text("fooLabelsOfScatterPoints");

    //  // Step 6: Initialize tool tip
    // // ==============================
    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.state}<br>Abbr: ${d.abbr}`);
    //   });

    //    // Step 7: Create tooltip in the chart
    // // ==============================
    // chartGroup.call(toolTip);

    //   // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================
    // circlesGroup.on("click", function(data) {
    //     toolTip.show(data, this);
    //   })
    //     // onmouseout event
    //     .on("mouseout", function(data, index) {
    //       toolTip.hide(data);
    //     });

    // // Create axes labels
    // chartGroup.append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 0 - margin.left + 40)
    //   .attr("x", 0 - (height / 2))
    //   .attr("dy", "1em")
    //   .attr("class", "axisText")
    //   .text("Number of Billboard 100 Hits");


    //   chartGroup.append("text")
    //   .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    //   .attr("class", "axisText")
    //   .text("Hair Metal Band Hair Length (inches)");
  }).catch(function(error) {
    console.log(error);
  

 });