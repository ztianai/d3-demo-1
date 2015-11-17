/* Create a scatter plot of 1960 life expectancy (le_1960) versus 2013 life expectancy (le_2013). 
	The variable "data" is accessible to you, as you read it in from data.js
*/

// Create app myApp with dependency 'ui.bootstrap'
var myApp = angular.module('myApp', ['ui.bootstrap'])

// Bind controller and set $scope.data as your data variable
myApp.controller('myCtrl', function($scope){	
	$scope.data = data
})

// Create a directive 'scatter' that creates scatterplots
.directive('scatter', function($filter, $compile) {
	// Return your directive element
	return {
		restrict:'E', // this directive is specified as an html element <scatter>

		// Define variables 'data' and 'search' as part of scope directive scope
		scope:{
			data:'=',
			search:'='
		},

		// Create a link function that allows dynamic element creation

		link:function(scope,elem,attrs){
			// Wrapper element to put your svg (chart) in
			wrapper = d3.select(elem[0]);			

			// Use the scope.$watch method to watch for changes to 'search', and executes your draw function
			scope.$watch('search', function() {				
				draw();
			});	

			// Scales and your svg element
			var xScale;
			var yScale;
			var svg = wrapper.append("svg")
				.attr('height', 699)
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

			// Write a function to set your scales
			var setScales = function() {
				// xScale
				var xMax =d3.max(data, function(d){return d.le_1960})*1.05
				var xMin =d3.min(data, function(d){return d.le_1960})*.95
				xScale  = d3.scale.linear().range([0, width]).domain([xMin, xMax])

				// yScale
				var yMin =d3.min(data, function(d){return d.le_2013})*.9
				var yMax =d3.max(data, function(d){return d.le_2013})*1.05		
				yScale = d3.scale.linear().range([height, 0]).domain([yMin, yMax])
			}

			// Set your scale variables
			setScales()			

			// Function for positioning your circles
			var circleFunc = function(circle) {
				circle.attr('r', 10)
					.attr('fill', 'blue')
					.attr('cx', function(d) { return xScale(d.le_1960)})
					.attr('cy', function(d) { return yScale(d.le_2013)})

					// Add a tooltip-append-to-body attribute, set it to true
					// Add a tooltip property that has the content you want in your tooltip					
					.attr("tooltip-append-to-body", true)
                    .attr("tooltip", function(d){
                        return d.country;
                    })				
					.style('opacity', .3)
			}								

			// Define x axis using d3.svg.axis(), assigning the scale as the xScale
			var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient('bottom')

			// Define y axis using d3.svg.axis(), assigning the scale as the yScale
			var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient('left')

			// Append x axis to your SVG, specifying the 'transform' attribute to position it
			svg.append('g').call(xAxis)
				.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
				.attr('class', 'axis')
			
			// Append y axis to your SVG, specifying the 'transform' attribute to position it
			svg.append('g')
				.attr('class', 'axis').call(yAxis)
				.attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

			// Add a title g for the x axis
			svg.append('text')
				.attr('transform', 'translate(' + (margin.left + width/2) + ',' + (height + margin.top + 40) + ')')
				.attr('class', 'title')
				.text('Life expectancy in 1960')

			// Add a title g for the x axis
			svg.append('text')
				.attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + height/2) + ') rotate(-90)')
				.attr('class', 'title')
				.text('Life expectancy in 2013')

			// Write a reusable drawing function for circles
			var draw = function() {
				// Filter down your data based on your search
				scope.filteredData = $filter('filter')(scope.data, scope.search);
				
				// Set Scales
				setScales()
				
				// Select all circles 
				var circles = g.selectAll('circle').data(scope.filteredData, function(d) {return d.country})
			
				// Use the .enter() method to get your entering elements, and then position them using your positioning function
				circles.enter().append('circle').call(circleFunc)

				// Compile entering nodes so that tooltip attribute is activated
				.call(function(){
                    $compile(this[0].parentNode)(scope);
                })
			
		  
				// Use the .exit() and .remove() methods to remove elements that are no longer in the data
				circles.exit().remove()
			  
				// Select all circle elements within your g and transition their position using your positioning function
				g.selectAll('circle').transition().duration(1500).call(circleFunc)     
			
			}
		}
	}
})

