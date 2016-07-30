'use strict';

var micropostsController = angular.module('micropostsController', []);

micropostsController.controller(
	'MicropostsCtrl',
	['$scope', '$state', 'flashHelper', 'microposts', 'Micropost', function ($scope, $state, flashHelper, microposts, Micropost) {
		$scope.microposts = microposts;
		$scope.deleteMicropost = function(id) {
			if (window.confirm('Are you sure?')) {
				Micropost.delete({id: id}, function() {
					flashHelper.set('Micropost was successfully destroyed.');
					$state.transitionTo($state.current, {}, {
						reload: true, inherit: false, notify: true
					});
				});
			}
		};
	}]
);

micropostsController.controller(
	'MicropostFormCtrl',
	['$scope', '$state', 'flashHelper', 'scaffoldHelper', 'Micropost', 'micropost', function ($scope, $state, flashHelper, scaffoldHelper, Micropost, micropost) {
		$scope.micropost = micropost;
		var service = 'create';
		var message = 'Micropost was successfully created.';
		$scope.title = 'New Micropost';
		$scope.submit_button_label = 'Create Micropost';
		if ($scope.micropost.id) {
			service = 'update';
			message = 'Micropost was successfully updated.';
			$scope.title = 'Editing Micropost';
			$scope.submit_button_label = 'Update Micropost';
		}

		$scope.saveMicropost = function() {
			Micropost[service]($scope.micropost, function(micropost){
				if ( micropost.errors ) {
					scaffoldHelper.errors(micropost.errors, 'micropost');
				} else {
					flashHelper.set(message);
					$state.transitionTo('micropost_detail', {id: micropost.id}, {
						reload: true, inherit: false, notify: true
					});
				}
			});
		};
	}]
);

micropostsController.controller(
	'MicropostsDetailCtrl',
	['$scope', 'flashHelper', 'micropost', function ($scope, flashHelper, micropost) {
		$scope.micropost = micropost;
	}]
);
