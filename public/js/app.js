var app = angular.module('app', ['ui.router', 'ngResource']);

app.factory('Channels', ['$resource', '$http',
	function($resource, $http) {
		return $resource('/channels');
	}
]);

app.directive('ngStream', function() {
	return {
		restrict: 'E',
		templateUrl: '/views/stream.html',
	}
});

app.controller('StreamController', ['$scope', '$q', 'Channels',
	function($scope, $q, Channels) {

		$scope.chooseChannel = function(channel) {
			$scope.channel = channel;
			angular.element( document.querySelector( '#now-playing' ) ).html('<ng-stream>');
		};

		$scope.channels = function() {
			var channels = $q.defer();

			var response = Channels.query(function() {
				channels.resolve(response);
			});

			return channels.promise;
		}();

		$scope.channel = function() {
			$scope.channels.then(function(channels) {
				var rand = parseInt(Math.random() * channels.length);
				var channel = channels[rand];
				$scope.channel = channel;
			});
		}();

		$scope.getGameIcon = function(game) {
			switch (game) {
				case "StarCraft II: Heart of the Swarm":
					return "assets/sc2.png";
				case "Dota 2":
					return "assets/dota2.png";
				case "League of Legends":
					return "assets/lol.png";
			}
		};
	}
]);