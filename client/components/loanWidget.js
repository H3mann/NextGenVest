var app = angular.module('Scholarships.widgetView',['n3-line-chart'])


app.controller('widgetController', function ($http, $scope, $location) {

	//submit function for loan input
	this.submit = function(amount,loanPeriod, interest, scholarship) {

	this.amount = amount
	this.interest = interest/100
	this.scholarship = scholarship
	this.loanPeriod =loanPeriod

	//loan chart calculations
	this.loanAmount = this.amount - this.scholarship
	this.payment = (this.loanAmount + (this.loanAmount * this.interest))/this.loanPeriod
	this.nextTotal = this.loanAmount - this.payment

	//chart options - which references the data set below
  this.options = {
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

  //chart data gets populated into data object from for loop
  this.data = {
  	dataset0: [{x: 0, val_0: this.loanAmount}]
  }
	for (var i = 1; i <= this.loanPeriod; i ++) {
		this.data.dataset0.push({x: i, val_0: this.nextTotal})
		this.nextTotal = this.nextTotal - this.payment
		if (this.nextTotal < 0) break
	}
}
	// call to node.js server to retrieve current interest rate data
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
})  //re usable loan widget directive(component)
.directive('loanWidget', function() {
  return {
    controller: 'widgetController',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: true,
    templateUrl: 'views/widgetView.html'
  };
});

