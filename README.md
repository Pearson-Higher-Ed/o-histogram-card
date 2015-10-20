# o-histogramcard [![Build Status](https://travis-ci.org/Pearson-Higher-Ed/o-histogram-card.svg)](https://travis-ci.org/Pearson-Higher-Ed/o-histogram-card)

## Use

To use, create a new instance of the card with a JSON configuration payload.

The JSON paramaters are as follows:

	data (required): data to be displayed in the histogram chart
    title (required): title of the graph
    size(required): size of the card to display the histogram chart medium,large
  	x_axisLabel (required): label on the x-axis for the data representation 
   	y_axisLabel (required): label on the y-axis for the data representation
   	verticalScale (required): vertical axis scaling for readability example if the scale size is 10 . vertical axis scaling will be 0,10,20,30,40,50
This card works by building the card in a DOM node and then returning that node when .getDomNode() is called.

### Example HTML
	<div class="card-medium-wide" id="chart"></div>
	<script>
			var Histogram = require("../../main");

			new Histogram("#chart", {
			size:"large",
			data:[
				{name: "0-9", value: 9},
				{name: "10-19", value: 18},
				{name: "20-29", value: 10},
				{name: "30-39", value: 30},
				{name: "40-49", value: 30},
				{name: "50-59", value: 20},
				{name: "60-69", value: 15}
			],
			x_axisLabel:"overall score",
			y_axisLabel:"# of students",
			verticalScale:"10",
			title: "Overall Score Distribution"}
	);
	</script>

Quick-start (to see the demo)

This card uses Origami Build Tools

To run the demo:

origami-build-tools install
origami-build-tools build
origami-build-tools demo --runServer --watch
The page will now be available locally, probably at http://localhost:8080/demos/local/demo.html
