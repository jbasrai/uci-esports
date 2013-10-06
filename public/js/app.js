var app = angular.module('app', ['ui.router', 'ngResource']);

app.factory('Channels', ['$resource', '$http',
	function($resource, $http) {
		return $resource('/channels');
	}
]);

var c = app.controller('StreamController', ['$scope', '$q', 'Channels',
	function($scope, $q, Channels) {
		
		function getActiveChannels() {
			var activeChannels = $q.defer();

			var channels = Channels.query(function() {
				activeChannels.resolve(channels);
			});

			return activeChannels.promise;
		};

		function chooseRandomChannel() {
			getActiveChannels().then(function(activeChannels) {
				var rand = parseInt(Math.random() * activeChannels.length);
				$scope.channel = activeChannels[rand]['channel'];
			})
		};
		
		chooseRandomChannel();
	}
]);