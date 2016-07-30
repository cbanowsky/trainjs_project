'use strict';

var postmen = angular.module('postmen', [
	'ui.router',
	'staticPagesController',
	'micropostService',
	'micropostsController',
	'alertDirective',
	'alertHelper',
	'userService',
	'usersController',
	'formFor',
	'formFor.defaultTemplates',
	'bodyDirective',
	'headDirective'
]);

postmen.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('static_pages_help', {
			url: '/static_pages/help',
			templateUrl: 'partials/static_pages/help.html',
			controller: 'StaticPagesHelpCtrl'
		})
		.state('static_pages_home', {
			url: '/',
			templateUrl: 'partials/static_pages/home.html',
			controller: 'StaticPagesHomeCtrl'
		})
	.state('micropost_form', {
		url: '/microposts/save/:id',
		templateUrl: 'partials/microposts/form.html',
		resolve: {
			micropost: ['$q', '$stateParams', 'Micropost', function($q, $stateParams, Micropost){
				if ( $stateParams == 'new' ) {
					return {content: '', user_id: ''};
				} else {
					var deferred = $q.defer();
					Micropost.get({id: $stateParams.id}, function(micropost) {
						deferred.resolve(micropost);
					}, function(error) {
						deferred.reject();
					});
					return deferred.promise;
				}
			}]
		},
		controller: 'MicropostFormCtrl'
	})
	.state('micropost_detail', {
		url: '/microposts/:id',
		templateUrl: 'partials/microposts/show.html',
		resolve: {
			micropost: ['$q', '$stateParams', 'Micropost', function($q, $stateParams, Micropost){
				var deferred = $q.defer();
				Micropost.get({id: $stateParams.id}, function(micropost) {
					deferred.resolve(micropost);
				}, function(error) {
					deferred.reject();
				});
				return deferred.promise;
			}]
		},
		controller: 'MicropostsDetailCtrl'
	})
	.state('microposts', {
		url: '/microposts',
		templateUrl: 'partials/microposts/index.html',
		resolve: {
			microposts: ['$q', 'Micropost', function($q, Micropost){
				var deferred = $q.defer();
				Micropost.query({}, function(microposts) {
					deferred.resolve(microposts);
				}, function(error) {
					deferred.reject();
				});
				return deferred.promise;
			}]
		},
		controller: 'MicropostsCtrl'
	})
	.state('user_form', {
		url: '/users/save/:id',
		templateUrl: 'partials/users/form.html',
		resolve: {
			user: ['$q', '$stateParams', 'User', function($q, $stateParams, User){
				if ( $stateParams == 'new' ) {
					return {name: '', email: ''};
				} else {
					var deferred = $q.defer();
					User.get({id: $stateParams.id}, function(user) {
						deferred.resolve(user);
					}, function(error) {
						deferred.reject();
					});
					return deferred.promise;
				}
			}]
		},
		controller: 'UserFormCtrl'
	})
	.state('user_detail', {
		url: '/users/:id',
		templateUrl: 'partials/users/show.html',
		resolve: {
			user: ['$q', '$stateParams', 'User', function($q, $stateParams, User){
				var deferred = $q.defer();
				User.get({id: $stateParams.id}, function(user) {
					deferred.resolve(user);
				}, function(error) {
					deferred.reject();
				});
				return deferred.promise;
			}]
		},
		controller: 'UsersDetailCtrl'
	})
	.state('users', {
		url: '/users',
		templateUrl: 'partials/users/index.html',
		resolve: {
			users: ['$q', 'User', function($q, User){
				var deferred = $q.defer();
				User.query({}, function(users) {
					deferred.resolve(users);
				}, function(error) {
					deferred.reject();
				});
				return deferred.promise;
			}]
		},
		controller: 'UsersCtrl'
	})
	.state('root', {
		url: '/',
		templateUrl: 'partials/index.html'
	})
}]);

// Disable Template Caching Angular UI
postmen.config(['$provide', function ($provide) {
	// Set a suffix outside the decorator function
	var cacheBuster = Date.now().toString();
	$provide.decorator('$templateFactory', ['$delegate', function ($delegate) {
		var fromUrl = angular.bind($delegate, $delegate.fromUrl);
		$delegate.fromUrl = function (url, params) {
			if (url !== null && angular.isDefined(url) && angular.isString(url)) {
				url += (url.indexOf("?") === -1 ? "?" : "&");
				url += "v=" + cacheBuster;
			}
			return fromUrl(url, params);
		};
		return $delegate;
	}]);
}]);

postmen.config(['$provide', function($provide) {
	$provide.decorator('$state', ['$delegate', '$rootScope', function($delegate, $rootScope) {
		$rootScope.$on('$stateChangeStart', function(event, state, params) {
			$delegate.next = state;
			$delegate.toParams = params;
		});
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
			$delegate.previous = fromState;
			$delegate.fromParams = fromParams;
		});
		return $delegate;
	}]);
}]);

postmen.run(['$rootScope', function($rootScope) {

}]);
