// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Initialize the dashboard at start up 
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
        
        // Set a variable for the sample names
        let names = data.names;

        // Add  samples to dropdown menu
        names.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let sample_one = names[0];

        // Log the value of sample_one
        console.log(sample_one);

        // Build the initial plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        buildGaugeChart(sample_one);
        buildPieChart(sample_one);
    });
};

// Function that populates metadata info
function buildMetadata(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let value = metadata.filter(result => result.id == sample);

        // Log the array of metadata objects after the have been filtered
        console.log(value)

        // Get the first index from the array
        let valueData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Function that builds the bar chart
function buildBarChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all sample data
        let sampleInfo = data.samples;

        //Find the selected sample
        //let selectedSample = sampleInfo.find(result => r //

        // Filter based on the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);

        // Set top ten items to display in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: 'bar',
            orientation: 'h',
            //marker:{
                //color:'blue'
            //}   
        };

        // Setup the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Function that builds the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

//Function that builds the Gauge Chart
function buildGaugeChart(sample) {
    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
      
      // Retrieve all metadata
      let metadata = data.metadata;
      
      // Filter based on the value of the sample
      let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      
      // Get the first index from the array
      let result = resultArray[0];
      
      // Get the washing frequency value
      let wfreq = result.wfreq;
      
      // Set up the trace for the gauge chart
      let trace = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: { text: "Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            bar: { color: "darkblue" },
            steps: [
              { range: [0, 1], color: "#f7fcfd" },
              { range: [1, 2], color: "#e5f5f9" },
              { range: [2, 3], color: "#ccece6" },
              { range: [3, 4], color: "#99d8c9" },
              { range: [4, 5], color: "#66c2a4" },
              { range: [5, 6], color: "#41ae76" },
              { range: [6, 7], color: "#238b45" },
              { range: [7, 8], color: "#006d2c" },
              { range: [8, 9], color: "#00441b" }
            ],
          }
        }
      ];
      
      // Set up the layout
      let layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
      
      // Call Plotly to plot the gauge chart
      Plotly.newPlot("gauge", trace, layout);
    });
  }
  

//Function that builds the Pie Chart
function buildPieChart(sample){
    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
      
      // Retrieve all sample data
      let sampleInfo = data.samples;
      
      // Filter based on the value of the sample
      let resultArray = sampleInfo.filter(sampleObj => sampleObj.id == sample);
      
      // Get the first index from the array
      let result = resultArray[0];
      
      // Get the otu_ids, lables, and sample values
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      let sample_values = result.sample_values;
      
      // Log the data to the console
      console.log(otu_ids, otu_labels, sample_values);
      
      // Set up the trace for the pie chart
      let trace = [
        {
          values: sample_values.slice(0, 10),
          labels: otu_ids.slice(0, 10),
          hovertext: otu_labels.slice(0, 10),
          hoverinfo: "hovertext",
          type: "pie"
        }
      ];

    // Set up the layout
    let layout = { width: 500000, height: 400, margin: { t: 0, b: 0 } };
//Troubleshoot

    //if (!document.getElementById("pie")) {
       // console.error("No element with id 'pie' found in the DOM");
       // return;
      //}
      
      
    // Call Plotly to plot the gauge chart
    Plotly.newPlot("pie", trace, layout);
  });
}  
init();
// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
    buildPieChart(value);
};

// Call the initialize function
init();