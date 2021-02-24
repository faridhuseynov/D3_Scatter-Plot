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
    .attr("id", "canvas")
    .attr("width", width)
    .attr("height", height);

    svg.append("text")
    .text("Doping in Professional Bicycle Racing")
    .attr("x",width-1.5*padding)
    .attr("y",padding-40)
    .style("text-anchor","end")
    .style("font-size","35px");

    svg.append("text")
    .text("35 Fastest times up Alpe d'Huez")
    .attr("x",width-3*padding)
    .attr("y",padding)
    .style("text-anchor","end")
    .style("font-size","25px");

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

  const timesScaled = times.map((time) => yScale(time)*1000/1000);

  const regularLabels = (timeExtent) => {
    // arr like [min Date, max Date]
    // step in milliseconds
    const step = 1000;
    const labels = [];
    for (const d=timeExtent[0]; d<=timeExtent[1]; d.setTime(d.getTime() + step)) {
      if (d.getSeconds() % 15 == 0) labels.push(d.getTime());
    }
    return labels;
  }

  const yAxis = d3
    .axisLeft(yScale)
    .tickValues(regularLabels(d3.extent(times)))
    .tickFormat((time) =>
      (d3.timeFormat(timeSpecifier)(time)));

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(" + (padding) + ",0)")
    .call(yAxis);

  // create the div for tooltip
  const div = d3.selectAll("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", "0");

  // Y-axis description
  svg.append("text").text("Time in Minutes")
    .style("font-size", "20px")
    .attr("transform", "translate(30,130) rotate(-90)")
    .style("text-anchor", "end");

  // X-axis description
  svg.append("text").text("Years")
    .attr("transform", "translate(" + (width / 2) + "," + (height - 30) + ")")
    .attr("font-size", "20px")
    .style("text-anchor", "end");

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
      return ((d.Year))
    })
    .attr("data-yvalue", d => {
      var time = (d.Time).split(":");
      var min = time[0];
      var secs = time[1];
      var date = new Date(1970, 0, 1, 1, min, secs);
      return date;
    })
    .on("mouseover", (event, d) => {
      div.transition()
        .duration(200)
        .style("opacity", "0.9")
        .attr("data-year", d.Year)
        .attr("id", "tooltip");
      div.html(d.Name + ": " + d.Nationality + "<br/>"
        + "Year: " + d.Year
        + " Time: " + d.Time + "<br/><br/>"
        + d.Doping)
        .style("left", (event.pageX + 20) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", d => {
      div.transition()
        .duration(500)
        .style("opacity", "0");
    });

  const legendBlock = svg.append("g").attr("id", "legend");

  const legend = legendBlock
    .append("g")
    .attr("transform", "translate(0,10)");

  legend
    .append("rect")
    .attr("x", width - padding)
    .attr("y", height / 2)
    .attr("height", 15)
    .attr("width", 15)
    .attr("fill", "#FF993E");

  legend
    .append("text")
    .attr("x", width - padding - 10)
    .attr("y", height / 2 + 10)
    .text("No doping allegations")
    .style("text-anchor", "end");

  legend
    .append("rect")
    .attr("x", width - padding)
    .attr("y", height / 2 + 20)
    .attr("height", 15)
    .attr("width", 15)
    .attr("fill", "#4C92C3")

  legend
    .append("text")
    .attr("x", width - padding - 10)
    .attr("y", height / 2 + 30)
    .text("Rides with doping allegations")
    .style("text-anchor", "end");

};
