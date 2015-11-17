/* Create a scatter plot of 1960 life expectancy (le_1960) versus 2013 life expectancy (le_2013). 
	The variable "data" is accessible to you, as you read it in from data.js
*/

// Create app myApp with dependency 'ui.bootstrap'
var myApp = angular.module("myApp", ['ui.bootstrap'])

// Bind controller and set $scope.data as your data variable
myApp.controller('myCtrl', function($scope){
	$scope.data = data;
})


// Create a directive 'scatter' that creates scatterplots, and takes in $filter and $compile
myApp.directive('scatter', function($filter, $compile){
	// Return your directive element
	return {
		restrict:'E', // this directive is specified as an html element <scatter>

		// Define variables 'data' and 'search' as variables you've passed into HTML
		scope:{
			

		},

		// Create a link function that allows dynamic element creation

		link:function(scope,elem,attrs){
			// Create a variable wrapper by making a d3 selection the HTML element elem[0]


			// Use the scope.$watch method to watch for changes to 'search', and executes your draw function



			// Copy and paste code from your_scatter_code.js into here
		}
	}
})

