const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, true);
xhttp.send();
xhttp.onload = () => {
  const dataset = JSON.parse(xhttp.responseText);
  console.log(dataset);

  //title element with id="title"
  d3.select("body").append("title")
  .attr("id", "title")
  .text("Scatter Plot");


};
