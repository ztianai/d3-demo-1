/* Create a scatter plot of unemployment rates (x) versus weekly earnings (y) 
    the variable "data" is accessible to you, as you read it in from data.js
*/


// Here are your scaling variables you'll reference within your functions
var xScale, yScale;



// SVG to work with
var svg = d3.select('#vis')
  .append('svg')
  .attr('height', 400)
  .attr('width', 400)

// Write a function to set your scales.  This should calculate the min and max of your varibles of interest
// and then set your "xScale" and "yScale" variables equal to d3 linear scale functions
var setScales = function() {
  
  
  
  
}

/* Write a function to define the positioning of your circles.
  In addition to the typical properties (cx, cy, r), assign a "title"
  property to have hover text
*/

var circleFunc = function(circle) {
    
  
  
}

// Write a reusable drawing function for circles

var draw = function(data) {
    // Call you set scales function
  
    
    // Select circles within your SVG and bind your data to the selection
    
  
	
    // Use the .enter() method to get your entering elements, and then position them using your positioning function
    
	
  
    // Use the .exit() method to exit elements that may have left
	
  
  
    // Select all circle elements within your svg and transition transition their position using your positioning function
   
  
  
}

// Pass data to your drawing function


// Create a tooltip for your circles.  Note, you'll have to follow the suggestion here:
// http://stackoverflow.com/questions/14697232/how-do-i-show-a-bootstrap-tooltip-with-an-svg-object
