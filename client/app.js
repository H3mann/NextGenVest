
angular.module('Scholarships',
	[ 'Scholarships.widgetView','ui.router'])


.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/')

	$stateProvider
	.state('home', {
		url: '/',
		template: '<loan-widget> </loan-widget>',
		controller: 'widgetController'
	})
})