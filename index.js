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
    .domain([d3.min(years) - 1, d3.max(years)+1])
    .range([padding, width - padding]);

  const xAxis = d3.axisBottom(xScale);

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
  const specifier = "%M:%S";
  const times = dataset.map((data) => d3.timeParse(specifier)(data.Time));
  const yScale = d3
    .scaleTime()
    .domain([d3.min(times), d3.max(times)])
    .range([padding, height - padding]);

  const timesScaled = times.map((time) => yScale(time));

  const yAxis = d3
    .axisLeft(yScale)
    .tickValues(times)
    .tickFormat((time) => d3.timeFormat(specifier)(time));

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
    .attr("class","dot")
    .attr("fill",d=>(d.Doping==""?"#FF993E":"#4C92C3"))
    .attr("data-xvalue",d=> (parseInt(d.Year)))
    .attr("data-yvalue",d=>(new Date(d.Time)).getTime())
    ;

  svg
    .append("rect")
    .attr("x",width-padding)
    .attr("y",height/2)
    .attr("height",15)
    .attr("width",15)
    .attr("fill","#FF993E")
    .style("border","20px");

svg
    .append("text")
    .attr("x",width-2.7*padding)
    .attr("y",height/2+10)
    .text("No doping allegations")

    svg
    .append("rect")
    .attr("x",width-padding)
    .attr("y",height/2+20)
    .attr("height",15)
    .attr("width",15)
    .attr("fill","#4C92C3")
    .style("border","20px");
    
    svg
    .append("text")
    .attr("x",width-2.7*padding)
    .attr("y",height/2+30)
    .text("Rides with doping allegations")

  };
