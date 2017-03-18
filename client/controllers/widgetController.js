var app = angular.module('Scholarships.widgetView',['n3-line-chart'])


app.controller('widgetController', function ($http, $scope, $location) {
		
	
	$scope.submit = function(amount,loanPeriod, interest, scholarship) {
		
		$scope.amount = amount
		$scope.interest = interest/100
		$scope.scholarship = scholarship
		$scope.loanPeriod =loanPeriod

	$scope.loanAmount = $scope.amount - $scope.scholarship

	$scope.payment = ($scope.loanAmount + ($scope.loanAmount * $scope.interest))/$scope.loanPeriod

	$scope.nextTotal = $scope.loanAmount - $scope.payment

  $scope.data = {
  	dataset0: []
  }

	for (var i = 1; i <= $scope.loanPeriod; i ++) {
		$scope.nextTotal = $scope.nextTotal - $scope.payment
		if ($scope.nextTotal < 0) break
		$scope.data.dataset0.push({x: i, val_0: $scope.nextTotal})
	}

  $scope.options = {
    series: [
       {
        axis: "y",
        dataset: "dataset0",
        key: "val_0",
        label: "An area series",
        color: "#1f77b4",
        type: ['line', 'dot', 'area'],
        id: 'mySeries0'
      },

    ],
    axes: {x: {key: "x"}}
  };
}

	$scope.getLoanData = function () {

		$http({
			'method': 'GET',
			'url': '/loanData',
			'Content-Type': 'application/json'

		})
		.then(function(response){
			console.log(response,'response')
			$scope.interestData = response.data
		})
		.catch(function(err){
			console.log(err,'error in submit request')
		})
	}

	$scope.getLoanData()

})







// app.directive('linearChart', function($window){
//    return{
//       restrict:'EA',
//       template:"<svg width='850' height='200'></svg>",
//        link: function(scope, elem, attrs){
//            var loanDataToPlot=scope[attrs.chartData];
//            var padding = 20;
//            var pathClass="path";
//            var xScale, yScale, xAxisGen, yAxisGen, lineFun;

//            var d3 = $window.d3;
//            console.log('here',d3)
//            var rawSvg=elem.find('svg');
//            var svg = d3.select(rawSvg[0]);

//            function setChartParameters(){

//                xScale = d3.scale.linear()
//                    .domain([loanDataToPlot[0].loanPeriod, loanDataToPlot[loanDataToPlot.length-1].loanPeriod])
//                    .range([padding + 5, rawSvg.attr("width") - padding]);

//                yScale = d3.scale.linear()
//                    .domain([0, d3.max(loanDataToPlot, function (d) {
//                        return d.loanAmount;
//                    })])
//                    .range([rawSvg.attr("height") - padding, 0]);

//                xAxisGen = d3.svg.axis()
//                    .scale(xScale)
//                    .orient("bottom")
//                    .ticks(loanDataToPlot.length - 1);

//                yAxisGen = d3.svg.axis()
//                    .scale(yScale)
//                    .orient("left")
//                    .ticks(5);

//                lineFun = d3.svg.line()
//                    .x(function (d) {
//                        return xScale(d.loanPeriod);
//                    })
//                    .y(function (d) {
//                        return yScale(d.loanAmount);
//                    })
//                    .interpolate("basis");
//            }
         
//          function drawLineChart() {

//                setChartParameters();

//                svg.append("svg:g")
//                    .attr("class", "x axis")
//                    .attr("transform", "translate(0,180)")
//                    .call(xAxisGen);

//                svg.append("svg:g")
//                    .attr("class", "y axis")
//                    .attr("transform", "translate(20,0)")
//                    .call(yAxisGen);

//                svg.append("svg:path")
//                    .attr({
//                        d: lineFun(loanDataToPlot),
//                        "stroke": "blue",
//                        "stroke-width": 2,
//                        "fill": "none",
//                        "class": pathClass
//                    });
//            }

//            drawLineChart();
//        }
//    };
// });