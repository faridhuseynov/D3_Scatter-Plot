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

  const years = dataset.map((data) => data.Year);
  
  
  const xScale = d3
  .scaleLinear()
  .domain([d3.min(years), d3.max(years)])
  .range([padding, width - padding]);
  
  const xAxis = d3.axisBottom(xScale);
  
  const svg = d3
    .select("#main")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .attr("id","x-axis")
    .attr("transform", "translate(0,"
     + (height - padding) + ")")
    .call(xAxis);

};
