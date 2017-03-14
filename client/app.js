
angular.module('Scholarships',
	[ 'Scholarships.widgetView','ui.router',])


.config(function($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise('/')

$stateProvider
.state('home', {
	url: '/',
	templateUrl: '/views/widgetView.html',
	controller: 'widgetController'
})



})