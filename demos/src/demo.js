/*global require*/
"use strict";

document.addEventListener("DOMContentLoaded", function() {
	var Histogram = require("../../main");

	new Histogram("#chart", {
		size:"medium",
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
});
