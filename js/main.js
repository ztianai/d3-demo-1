/* Create a scatter plot of 1960 life expectancy (le_1960) versus 2013 life expectancy (le_2013). 
	The variable "data" is accessible to you, as you read it in from data.js
*/

// Create app myApp with dependency 'ui.bootstrap'
var myApp = angular.module('myApp', ['ui.bootstrap'])

// Bind controller and set $scope.data as your data variable
myApp.controller('myCtrl', function($scope){	
	$scope.data = data
	// $scope.search="China"
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

			// Bubble layout
			var bubble = d3.layout.pack()
			    .sort(null)
			    .size([500, 500])
			    .value(function(d){return d.le_1960})

			// Svg element
			var svg = wrapper.append("svg")
				.attr('height', 500)
				.attr('width', 500)

			
			var circleFunc = function(circle) {
			  circle.attr("class", "node")
			        .attr("cx", function(d) { return d.x})
			        .attr("cy", function(d) {return d.y})
			        .attr("r", function(d) { return d.r; })
			        .attr("popover-append-to-body", true)
			        .attr('popover-trigger', "mouseenter")
                    .attr("uib-popover", function(d){
                        return d.country;
                    })				
					.style('opacity', .3)
			}

			var draw = function() {
				var filtered = $filter('filter')(scope.data, scope.search)
				scope.filteredData = {children:angular.copy(filtered)};

			  	var circles = svg.selectAll("circle")
			    	.data(bubble.nodes(scope.filteredData), function(d){return d.country})
			    
				circles.enter().append("circle")
			        .call(circleFunc)
			        .call(function(){
	                    $compile(this[0].parentNode)(scope);
	                })

			 	 circles.exit().remove()

			 	 svg.selectAll('circle').transition().duration(500).call(circleFunc)  
			}	
							
		}
	}
})

