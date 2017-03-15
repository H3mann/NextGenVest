var app = angular.module('Scholarships.widgetView',[])

app.controller('widgetController', function ($http, $scope, $location) {

$scope.loanData = [
    {loanPeriod: 1,loanAmount: 54},
    {loanPeriod: 2,loanAmount: 66},
    {loanPeriod: 3,loanAmount: 77},
    {loanPeriod: 4,loanAmount: 70},
    {loanPeriod: 5,loanAmount: 60},
    
  ];
	$scope.user = {
		amount: 0,
		interest: 0,
		loanPeriod: 0
	}

	$scope.submit = function () {

		$http({
			'method': 'GET',
			'url': '/loanData',
			'Content-Type': 'application/json'

		})
		.then(function(response){
			console.log(response,'response')
			$scope.data = response.data
		})
		.catch(function(err){
			console.log(err,'error in submit request')
		})
	}



})


app.directive('linearChart', function($window){
   return{
      restrict:'EA',
      template:"<svg width='850' height='200'></svg>",
       link: function(scope, elem, attrs){
           var loanDataToPlot=scope[attrs.chartData];
           var padding = 20;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           var d3 = $window.d3;
           console.log('here',d3)
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

           function setChartParameters(){

               xScale = d3.scale.linear()
                   .domain([loanDataToPlot[0].loanPeriod, loanDataToPlot[loanDataToPlot.length-1].loanPeriod])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

               yScale = d3.scale.linear()
                   .domain([0, d3.max(loanDataToPlot, function (d) {
                       return d.loanAmount;
                   })])
                   .range([rawSvg.attr("height") - padding, 0]);

               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(loanDataToPlot.length - 1);

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5);

               lineFun = d3.svg.line()
                   .x(function (d) {
                       return xScale(d.loanPeriod);
                   })
                   .y(function (d) {
                       return yScale(d.loanAmount);
                   })
                   .interpolate("basis");
           }
         
         function drawLineChart() {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,180)")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(loanDataToPlot),
                       "stroke": "blue",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
           }

           drawLineChart();
       }
   };
});