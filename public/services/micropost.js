var micropostService = angular.module('micropostService', ['ngResource']);

micropostService.factory('Micropost', ['$resource', function($resource){
	return $resource('microposts/:id', {id:'@id'}, {
		'get':    {method:'GET'},
		'create': {method:'POST'},
		'update': {method:'PUT'},
		'query':  {method:'GET', isArray:true},
		'delete': {method:'DELETE'}
	});
}]);
