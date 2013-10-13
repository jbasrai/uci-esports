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
			//$scope.channel = channel;
			console.log('choose'); 
			angular.element( document.querySelector( '#now-playing-container' ) ).html('<object id="now-playing" type="application/x-shockwave-flash" height="540" width="900" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=' + channel['stream']['channel']['name'] + '" bgcolor="#000000">\
			<param name="allowFullScreen" value="true"> \
			<param name="allowScriptAccess" value="always"> \
			<param name="allowNetworking" value="all"> \
			<param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf"> \
			<param id="flashvars" name="flashvars" value="hostname=www.twitch.tv&amp;channel=' + channel['stream']['channel']['name'] + '&amp;auto_play=true"> \
			</object>');
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