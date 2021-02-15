const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

const height = 700;
const width = 800;
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
    .domain(0, d3.max(years))
    .range(height, height - padding);

  const xAxis = d3.axisBottom(xScale);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .attr("transform", "translate(0,"
     + (height - padding) + ")")
    .call(xAxis);

};
