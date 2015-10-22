/*global*/

"use strict";

module.exports = function() {
	var _width = 400;
	var _height = 200;
	var _data = {};
	var _element = null;
	var _xaxisLabel = null;
	var _yaxisLabel = null;
	var _verticalScale = 20;
	var _cardSize = null;
	var top = null;
	var bottom = null;
	var spacing = null;
	var newTopValue = null;
	var textXaxis = null;

	function chart(dom) {
		var svg = createSVGElement("svg");
		svg.setAttribute("width", _width);
		svg.setAttribute("height", _height);

		var legend = createLegend();
		svg.appendChild(legend, spacing);

		var svgChart = createChart(svg);
		svg.appendChild(svgChart);

		dom.appendChild(svg);
	}

	chart.width = function(value) {
		if (!arguments.length) {
			return _width;
		}
		_width = value;
		return chart;
	};

	chart.height = function(value) {
		if (!arguments.length) {
			return _height;
		}
		_height = value;
		return chart;
	};

	chart.data = function(value) {
		if (!arguments.length) {
			return _data;
		}
		_data = value;
		return chart;
	};

	chart.element = function(value) {
		if (!arguments.length) {
			return _element;
		}
		_element = value;
		return chart;
	};

	chart.x_axisLabel = function(value) {
		if (!arguments.length) {
			return _xaxisLabel;
		}
		_xaxisLabel = value;
		return chart;
	};

	chart.y_axisLabel = function(value) {
		if (!arguments.length) {
			return _yaxisLabel;
		}
		_yaxisLabel = value;
		return chart;
	};

	chart.cardSize = function(value) {
		if (!arguments.length) {
			return _cardSize;
		}
		_cardSize = value;
		return chart;
	};
	// vertical scaling size for example if vertical scale size is 10 ,The vertical axis would be 0,10,20,30,40,50
	chart.verticalScale = function(value) {
		if (!arguments.length) {
			return _verticalScale;
		}
		_verticalScale = value;
		return chart;
	};

	return chart;
	// Convienient functions are below for creating the whole chart.
	function createSVGElement(element) {
		return document.createElementNS("http://www.w3.org/2000/svg", element);
	}

	function createLegend() {
		intializing(_cardSize);
		var legend = createSVGElement("g");
		legend.setAttribute("class", "o-histogram__legend");
		var ylabel = createSVGElement("text");
		ylabel.setAttribute("x", textXaxis);
		ylabel.setAttribute("y", top * 2 );
		ylabel.setAttribute("transform", "rotate(270 10 " + top * 2 + ")");
		ylabel.appendChild(document.createTextNode(_yaxisLabel));
		legend.appendChild(ylabel);


		var i = 0;
		for(i = 0; i < 6; i++) {
			var line = createSVGElement("line");
			line.setAttribute("x1", 30);
			line.setAttribute("x2", _width - 50);
			line.setAttribute("y1", newTopValue + (i * spacing));
			line.setAttribute("y2", newTopValue + (i * spacing));
			legend.appendChild(line);
			var text = createSVGElement("text");
			text.setAttribute("x", 30);
			text.setAttribute("y", bottom - (i * spacing));
			text.appendChild(document.createTextNode(i * _verticalScale));
			legend.appendChild(text);
		}
		return legend;
	}

	function createChart(svg) {
		var chart = createSVGElement("g");
		var valueIs = null;
		if (_verticalScale < 20) {
			valueIs = '*' ;
		} else if (_verticalScale > 20) {
			valueIs = '/' ;
		}
		_data.forEach(function(d, i) {
			var container = createSVGElement("g");
			container.setAttribute("transform", "translate("+ (((i+1) * (_width / 10)) + 5) + ")");

			var rect = createSVGElement("rect");
			rect.setAttribute("width", 30);
			rect.setAttribute("height", mathCalculation(d.value ,valueIs));
			rect.setAttribute("y", bottom - mathCalculation(d.value , valueIs));
			container.appendChild(rect);

			var percent = createSVGElement("text");
			var tspan1 = createSVGElement("tspan");
			var tspan2 = createSVGElement("tspan");
			percent.setAttribute("y", bottom - mathCalculation(d.value ,valueIs) - 5);
			percent.setAttribute("x", 15);
			percent.setAttribute("class", "o-histogram__percent-value-text o-histogram-hidden-item text-value" + i);
			tspan1.setAttribute("y", bottom - mathCalculation(d.value ,valueIs) - 20);
			tspan1.setAttribute("x", 15);
			tspan1.setAttribute("class", "o-histogram__percent-value-text o-histogram-item");
			tspan1.appendChild(document.createTextNode(d.value));
			tspan2.setAttribute("y", bottom - mathCalculation(d.value , valueIs) - 10);
			tspan2.setAttribute("x", 15);
			tspan2.setAttribute("class", "o-histogram__percent-value-text");
			tspan2.appendChild(document.createTextNode("students"));
			percent.appendChild(tspan1);
			percent.appendChild(tspan2);
			container.appendChild(percent);

			var name = createSVGElement("text");
			name.setAttribute("y", bottom + 10);
			name.setAttribute("x", 15);
			name.appendChild(document.createTextNode(d.name));
			container.appendChild(name);

			//rect events
			rect.onmouseover = function() {
				this.style.fill = "#2A9FD8";
				percent.setAttribute("class", "");
			};
			rect.onmouseout = function() {
				this.style.fill = "#5C656B";
				percent.setAttribute("class", "o-histogram-hidden-item");
			};

			chart.appendChild(container);
		});
		var name2 = createSVGElement("text");
			name2.setAttribute("y", bottom + 35);
			name2.setAttribute("x", 200);
			name2.appendChild(document.createTextNode(_xaxisLabel));
			chart.appendChild(name2);
		return chart;
	}

	function mathCalculation(data, operator){
		switch (operator) {
			case '*': return data *  (20 / _verticalScale);
			case '/': return data / (_verticalScale / 20);
			default: return 'null';
		}
	}

	function intializing(_cardSizeValue) {
		top =_height / 4;
		bottom = top * 3;
		if (_cardSizeValue === "large") {
			newTopValue = top *2;
			textXaxis = 0;
			spacing = (bottom - top) / 10;

		}else {
			newTopValue = top;
			textXaxis = 50;
			spacing = (bottom - top) / 5;
		}
	}


};
