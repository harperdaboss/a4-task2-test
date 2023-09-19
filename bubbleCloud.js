const width = 800;
const height = 500;

// Create the SVG container
const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load the data
d3.csv("https://script.google.com/macros/s/AKfycbz_2LUX4Fgi-vgI4jAvbx38BaoTmRWk28Qb0xlHVl5dR3uui1PGEP3eUpe0BMVrtmJJTw/exec")
    .then(data => {
        console.log(data);
        // Filter the data to only have 1995 and 2020 values for China and Denmark
        if (!data || !Array.isArray(data) || !data[0].Country || !data[0].Year) {
            console.error("Data format is not as expected");
            return;
        }
        
        const filteredData = data.filter(d => {
            return (d.Country === "China" || d.Country === "Denmark") && (d.Year === "1995" || d.Year === "2020");
        });

        // Define a scale for the radius of the bubbles
        const radiusScale = d3.scaleSqrt()
            .domain([0, d3.max(filteredData, d => d.Value)])
            .range([10, 50]);

        // Create the circles
        svg.selectAll("circle")
            .data(filteredData)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => (i % 2 === 0) ? width / 3 : 2 * width / 3)
            .attr("cy", (d, i) => (i < 2) ? height / 3 : 2 * height / 3)
            .attr("r", d => radiusScale(d.Value))
            .attr("class", d => d.Country.toLowerCase());
    });
