const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

const height = 700;
const width = 900;
const padding = 80;

var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, true);
xhttp.send();
xhttp.onload = () => {
  const dataset = JSON.parse(xhttp.responseText);
  console.log(dataset);

  //title element with id="title"
  d3.select("body").append("title").attr("id", "title").text("Scatter Plot");

  const years = dataset.map((data) => parseInt(data.Year));

  const xScale = d3
    .scaleLinear()
    .domain([d3.min(years) - 1, d3.max(years) + 1])
    .range([padding, width - padding]);

  const dateSpecifier = "y";
  const xAxis = d3.axisBottom(xScale).tickFormat(year => d3.format(dateSpecifier)(year));

  const svg = d3
    .select("#main")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

  //specify format of time to get
  const timeSpecifier = "%M:%S";
  const times = dataset.map((data) => d3.timeParse(timeSpecifier)(data.Time));
  const yScale = d3
    .scaleTime()
    .domain([d3.min(times), d3.max(times)])
    .range([padding, height - padding]);

  const timesScaled = times.map((time) => yScale(time));

  const yAxis = d3
    .axisLeft(yScale)
    .tickFormat((time) => d3.timeFormat(timeSpecifier)(time));

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d, i) => timesScaled[i])
    .attr("r", (d) => 6)
    .attr("class", "dot")
    .attr("fill", d => (d.Doping == "" ? "#FF993E" : "#4C92C3"))
    .attr("data-xvalue", d => {
      console.log(d.Year);
      console.log(xScale(d.Year));
      return ((d.Year))
    })
    .attr("data-yvalue", d => {
      var time = (d.Time).split(":");
      var min = time[0];
      var secs = time[1];
      var date = new Date(0, 0, 0, 0, min, secs, 0);
      return date;
    });

    // svg
    //   .append("rect")
    //   .attr("id","legend")
    //   .attr("x",width-padding)
    //   .attr("y",height/2)
    //   .attr("height",50)
    //   .attr("width",50);
  svg
    // .selectAll("#legend")
    .append("rect")
    .attr("x", width - padding)
    .attr("y", height / 2)
    .attr("height", 15)
    .attr("width", 15)
    .attr("fill", "#FF993E")
    .attr("class", "legend")
    .style("border", "20px");

  svg
  // .selectAll("#legend")
    .append("text")
    .attr("x", width - 2.4 * padding)
    .attr("y", height / 2 + 10)
    .text("No doping allegations")

  svg
  // .selectAll("#legend")
    .append("rect")
    .attr("x", width - padding)
    .attr("y", height / 2 + 20)
    .attr("height", 15)
    .attr("width", 15)
    .attr("fill", "#4C92C3")
    .attr("class", "legend")
    .style("border", "20px");

  svg
  // .selectAll("#legend")
    .append("text")
    .attr("x", width - 2.86 * padding)
    .attr("y", height / 2 + 30)
    .text("Rides with doping allegations")

};
