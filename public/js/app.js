var app = angular.module('app', ['ui.router', 'ngResource']);

app.factory('Channels', ['$resource', '$http',
	function($resource, $http) {
		return $resource('/channels');
	}
]);

var c = app.controller('StreamController', ['$scope', '$q', 'Channels',
	function($scope, $q, Channels) {

		$scope.channels = function() {
			var channels = $q.defer();

			var response = Channels.query(function() {
				channels.resolve(response);
			});

			return channels.promise;
		}();

		$scope.channel = function() {
			var channel = $q.defer();

			$scope.channels.then(function(channels) {
				var rand = parseInt(Math.random() * channels.length);
				channel.resolve(channels[rand]);
			});

			return channel.promise;
		}();

		$scope.chooseChannel = function(channel) {
			$scope.channel = channel;
		};

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