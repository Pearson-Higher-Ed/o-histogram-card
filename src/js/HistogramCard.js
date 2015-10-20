/*global*/
"use strict";

var histogram = require("./histogram");

function HistogramCard(element, params) {
	if (!(this instanceof HistogramCard)) {
		throw new TypeError("Constructor Histogram requires \"new\"");
	}
	if (!element) {
		throw new TypeError("missing required argument: element");
	}
	if (typeof element === "string") {
		element = document.querySelector(element);
	}
	if (!element) {
		return;
	}

	if(!params.size || !params.data || !params.title || !params.x_axisLabel || !params.y_axisLabel || !params.verticalScale) {
		throw "No data provided. Please configuration data.";
	}

	var width = 400;
	var height = 200;
	switch(params.size) {
		case "small":
			throw new Error("Size cannot be small");
		case "medium":
			width = 400;
			height = 200;
			break;
		case "large":
			width = 400;
			height = 400;
			break;
		default:
			break;
	}
	var chartDiv = document.createElement("div");
	chartDiv.className = "o-histogram";

	var chartTitle = document.createElement("h1");
	chartTitle.className = "o-histogram-title";
	chartTitle.innerHTML = params.title;

	chartDiv.appendChild(chartTitle);
	this.card = document.createElement("div");
	this.card.appendChild(chartDiv);
	this.card.className = "o-card o-card--" + params.size;

	var chart = histogram().width(width).height(height).data(params.data).x_axisLabel(params.x_axisLabel).y_axisLabel(params.y_axisLabel).verticalScale(params.verticalScale).cardSize(params.size);
	chart(chartDiv);

	element.appendChild(this.card);

}

module.exports = HistogramCard;
