const width = 1400;
const height = 600;

const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const umbrellaPath =
    "M50,50 Q100,0 150,50 L140,50 Q130,70 120,50 Q110,70 100,50 Q90,70 80,50 Q70,70 60,50 Z";

d3.csv("rainfall.csv").then(data => {

    data.forEach(d => {
        d.rain = +d.rain;
    });

    const maxRain = d3.max(data, d => d.rain);

    const colorScale = d3.scaleSequential()
        .domain([0, maxRain])
        .interpolator(d3.interpolateBlues);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 45)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("Seattle Rainy Days by Month");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 75)
        .attr("text-anchor", "middle")
        .attr("class", "label")
        .text("Darker and larger umbrellas represent rainier months");

    const groups = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (d, i) => {

            const x = 10 + (i * 110);
            const y = 210;

            return `translate(${x}, ${y})`;
        });

    groups.append("path")
        .attr("d", umbrellaPath)
        .attr("class", "umbrella")
        .attr("fill", d => colorScale(d.rain))
        .attr("transform", d => {

            const scale = 0.5 + (d.rain / maxRain);

            return `scale(${scale})`;
        });

    groups.append("text")
        .attr("x", 75)
        .attr("y", 150)
        .attr("class", "label")
        .text(d => d.month);

    groups.append("text")
        .attr("x", 75)
        .attr("y", 175)
        .attr("class", "label")
        .text(d => `${d.rain} rainy days`);

});