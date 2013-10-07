var app = angular.module('app', ['ui.router', 'ngResource']);

app.factory('Channels', ['$resource', '$http',
	function($resource, $http) {
		return $resource('/channels');
	}
]);

var c = app.controller('StreamController', ['$scope', '$q', 'Channels',
	function($scope, $q, Channels) {
		
		function getChannels() {
			var channels = $q.defer();

			var response = Channels.query(function() {
				channels.resolve(response);
			});

			return channels.promise;
		};

		function chooseRandomChannel() {
			var rand = parseInt(Math.random() * $scope.channels.length);
			$scope.channel = $scope.channels[rand]['channel'];
		};

		$scope.chooseChannel = function(channel) {
			console.log('choose');
			$scope.channel = channel;
		};

		function init() {
			getChannels().then(function(channels) {
				$scope.channels = channels;
				chooseRandomChannel();
			});
		};
		
		init();
	}
]);