var app = angular.module('app', ['ui.router', 'ngResource']);

app.factory('Channels', ['$resource', '$http',
	function($resource, $http) {
		return $resource('/channels');
	}
]);

var c = app.controller('StreamController', ['$scope', 'Channels',
	function($scope, Channels) {
		var channels = Channels.query(function() {
			$scope.channel = channels[0]['channel'];
		})
	}
]);