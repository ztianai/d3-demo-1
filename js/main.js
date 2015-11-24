/* Create a scatter plot of 1960 life expectancy (le_1960) versus 2013 life expectancy (le_2013). 
		The variable "data" is accessible to you, as you read it in from data.js
*/
$(function() {
 // SVG to work with.  The vis <div> is defined in HTML
	var svg = d3.select('#vis')
		.append('svg')
		.attr('height', 400)
		.attr('width', 400)

	// Margin: how much space to put in the SVG for axes/titles
	var margin = {
		left:70, 
		bottom:100, 
		top:50, 
		right:50,
	}

	// Height/width of the chart itself
	var height = 400 - margin.bottom - margin.top 
	var width = 400 - margin.left - margin.right

	// 'g' element in which to place the circles
	var g = svg.append('g')
			.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
			.attr('height', height)
			.attr('width', width)

	var xScale;
	var yScale
	// Write a function to set your scales
	var setScales = function() {
		// xScale
		var xMin = d3.min(data, function(d) {return d.le_1960})
		var xMax = d3.max(data, function(d) {return d.le_1960})
		xScale = d3.scale.linear()
					.domain([xMin, xMax])
					.range([0, width])

		// yScale	
		var yMin = d3.min(data, function(d) {return d.le_2013})
		var yMax = d3.max(data, function(d) {return d.le_2013})
		yScale = d3.scale.linear()
					.domain([yMax, yMin])
					.range([0, height])		
	}

	/* Write a function to define the positioning of your circles
		- cx attribute as the 1960 life expectancy
		- cy attribute as the 2013 life expectancy
		- title attribute as the country of the object
	*/
	var circleFunc = function(circle) {
		circle.attr('cx', function(d) {return xScale(d.le_1960)})
				.attr('cy', function(d) {return yScale(d.le_2013)})
			//  .attr('cy', function(d) {return yScale(d.le_2013)})
			  .attr('title', function(d) {return d.country})
			  .attr('r', 10)
			  .attr('fill', 'blue')
			  .style(opacity, 0.3)
	}

	// Write a reusable drawing function for circles
	var draw = function(data) {
		// Set Scales
		setScales()
		
		
		// Select all circles and bind your data to them
		var circles = svg.selectAll('circle').data(data, function(d) {return d.country})
	
		// Use the .enter() method to get your entering elements, and then position them using your positioning function
    	circles.enter()
    	.append('circle')
    	.call(circleFunc)
	
  
	    // Use the .exit() and .remove() methods to remove elements that are no longer in the data
		circles.exit().remove()
	  
	    // Select all circle elements within your g and transition their position using your positioning function
		svg.selectAll('circle0').transition().duration(500).call(circleFunc)

	
	}

	// Pass data to your drawing function
	draw(data)

	// Define x axis using d3.svg.axis(), assigning the scale as the xScale
	


	// Define y axis using d3.svg.axis(), assigning the scale as the yScale
	


	// Append x axis to your SVG, specifying the 'transform' attribute to position it
	

	
	// Append y axis to your SVG, specifying the 'transform' attribute to position it
	


	// Add a title for the x axis (text with class title)



	// Add a title g for the x axis (text with class title)


	
	/* Using jQuery, select all circles and apply a tooltip
	If you want to use bootstrap, here's a hint: 
	http://stackoverflow.com/questions/14697232/how-do-i-show-a-bootstrap-tooltip-with-an-svg-object
	*/
	
});