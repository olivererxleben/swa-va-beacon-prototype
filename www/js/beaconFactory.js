angular.module('starter')
.factory('BeaconFactory',
	function($http){

		var addr = 'http://192.168.2.101:9090/api/v1/beacons'
		return {
			beacon: function(major, minor, callback) {

				$http.get(addr + '/' + major + '/' + minor)
				.success(function(data) {

					return callback(data);
				})
				.error(function(data) {

					return callback(data);
				});
			}
		};
	});
