var app = angular.module('Scholarships.widgetView',[])

app.controller('widgetController', function ($http, $scope, $location) {


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
