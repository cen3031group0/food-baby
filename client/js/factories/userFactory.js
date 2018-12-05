angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      return $http.get(window.location.origin + '/api/users');
    },

	  create: function(user) {
	    return $http.post(window.location.origin + '/api/users', user);
    }, 

    delete: function(id) {
      return $http.delete(window.location.origin + '/api/users/' + id);
    }
  };

  return methods;
});