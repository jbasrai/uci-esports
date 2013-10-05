var app = angular.module('app', ['ui.router']);

app.config(['$locationProvider', '$stateProvider',
	function($locationProvider, $stateProvider) {
		$locationProvider.html5Mode(true);

		$stateProvider
		.state('streams', {
			url: '/streams',
			templateUrl: '/views/streams.html',
		})
		//->
			.state('streams.featured', {
				url: '/featured',
				templateUrl: '/views/featured.html',
			});
		//<-
	}
]);