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
			angular.element( document.querySelector( '#now-playing' ) ).html('\
				<object type="application/x-shockwave-flash" height="540" width="900" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=' + channel['stream']['channel']['name'] + '" bgcolor="#000000">\
					<param name="allowFullScreen" value="true">\
					<param name="allowScriptAccess" value="always">\
					<param name="allowNetworking" value="all">\
					<param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf">\
					<param id="flashvars" name="flashvars" value="hostname=www.twitch.tv&amp;channel=' + channel['stream']['channel']['name'] + '&amp;auto_play=true">\
				</object>'
			);
		};

		$scope.channels = function() {
			var channels = $q.defer();
			$scope.loading = true;

			var response = Channels.query(function() {
				channels.resolve(response);
				$scope.loading = false;
			});

			return channels.promise;
		}();

		$scope.channel = function() {
			$scope.channels.then(function(channels) {
				var rand = parseInt(Math.random() * channels.length);
				$scope.chooseChannel(channels[rand]);
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