# Belly_button_challenge
 The Belly Button Challenge was a practical application of advanced Data Visualization techniques using Javascript and HTML. The project was driven by expert guidance (Copied below) and aimed to leverage state-of-the-art tools to create meaningful visualizations from complex datasets. The challenge was designed to explore new approaches to data analysis and visualization and to push the boundaries of current technologies in this field. 

## Instructions


Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

### Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Use sample_values as the values for the bar chart.

* Use otu_ids as the labels for the bar chart.

* Use otu_labels as the hovertext for the chart.

![](images/hw01.png)

### Create a bubble chart that displays each sample.

* Use otu_ids for the x values.

* Use sample_values for the y values.

* Use sample_values for the marker size.

* Use otu_ids for the marker colors.

* Use otu_labels for the text values.

![](images/bubble_chart.png)

### Display the sample metadata, i.e., an individual's demographic information.

* Display each key-value pair from the metadata JSON object somewhere on the page.

![](images/hw03.png)

### Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown as follows:

![](images/hw02.png)


### Advanced Challenge Assignment (Optional with no extra points earning)
The following task is advanced and therefore optional.

Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/Links to an external site. to plot the weekly washing frequency of the individual.

You will need to modify the example gauge code to account for values ranging from 0 through 9.

Update the chart whenever a new sample is selected.
![](images/gauge.png)



