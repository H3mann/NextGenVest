var app = angular.module('Scholarships.widgetView',['n3-line-chart'])




app.controller('widgetController', function ($http, $scope, $location) {
		
	
	$scope.submit = function(amount,loanPeriod) {
		$scope.amount = amount
	console.log($scope.amount,'amount')
	$scope.loanPeriod = loanPeriod

	
  $scope.data = {
    dataset0: [
      {x: 0, val_0: $scope.amount, val_1: 0, val_2: 0, val_3: 0},
      {x: 1, val_0: 2, val_1: 3.894, val_2: 8.47, val_3: 14.347},
      {x: 2, val_0: 2, val_1: 7.174, val_2: 13.981, val_3: 19.991},
      {x: 3, val_0: 2, val_1: 9.32, val_2: 14.608, val_3: 13.509},
      {x: 4, val_0: 2, val_1: 9.996, val_2: 10.132, val_3: -1.167},
      {x: 5, val_0: 2, val_1: 9.093, val_2: 2.117, val_3: -15.136}
    ]
  };
  console.log($scope.data,'data!')
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


	// $scope.firstname = ''
	// console.log($scope.user.amount,'amount')
	// console.log($scope.firstname,'firstname')



	$scope.getLoanData = function () {

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