angular.module('starter')
.controller('BeaconCtrl',
	function ($scope, $ionicPlatform, BeaconFactory) {
			var start = 0;
			var end = 0;
			$ionicPlatform.ready(function() {
					var delegate = new cordova.plugins.locationManager.Delegate();

					delegate.didDetermineStateForRegion = function (pluginResult) {

					};

					delegate.didStartMonitoringForRegion = function (pluginResult) {

					};

					delegate.didRangeBeaconsInRegion = function (pluginResult) {

						if (pluginResult.beacons.length > 0) {
							var beacon = pluginResult.beacons[0];
							stopScan();

							BeaconFactory.beacon(beacon.major, beacon.minor, function(data) {
								alert(data.msg);
							})


						}

					};

					cordova.plugins.locationManager.setDelegate(delegate);

					// $scope functionss

					$scope.doScan = function() {
							console.log('scanning here');

							startScan();
					};

					// private functions

					/**
					 * Function that creates a BeaconRegion data transfer object.
					 *
					 */
					function createBeacon() {

							//var uuid = 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'; // mandatory, beacons from Kontakt.io
							//var uuid = '8492e75f-4fd6-469d-b132-043fe94921d8'; // mandatory, beacons from Kontakt.io
							var uuid = 'b9407f30-f5f8-466e-aff9-25556b57fe6d'
							var identifier = 'estimote'; // mandatory
							//var minor = 1000; // optional, defaults to wildcard if left empty
							//var major = 5; // optional, defaults to wildcard if left empty

							// throws an error if the parameters are not valid
							return new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);
					}

					function startScan() {

							cordova.plugins.locationManager.startRangingBeaconsInRegion(createBeacon())
								.fail(console.error)
								.done();
					}

					function stopScan() {
							cordova.plugins.locationManager.stopRangingBeaconsInRegion(createBeacon())
								.fail(console.error)
								.done();


					}
			});
	});
