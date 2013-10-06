var app = angular.module('app', ['ui.router']);

app.controller('NowPlayingController', ['$scope', 
	function($scope) {
		$scope.channel = 'painuser';
	}
]);