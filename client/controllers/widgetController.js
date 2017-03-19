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

  $scope.data = {
  	dataset0: [{x: 0, val_0: $scope.loanAmount}]
  }

	for (var i = 1; i <= $scope.loanPeriod; i ++) {
		$scope.data.dataset0.push({x: i, val_0: $scope.nextTotal})
		$scope.nextTotal = $scope.nextTotal - $scope.payment
		if ($scope.nextTotal < 0) break
	}

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

app.directive('itemsContainer', function() {
  return {
    controller: 'ItemsContainerController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'items-container.html'
  };
});

