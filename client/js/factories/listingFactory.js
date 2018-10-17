angular.module('events', []).factory('Events', function($http) {
  var methods = {
    getAll: function() {
      return $http.get(window.location.origin + '/api/events');
    },
	
	  create: function(listing) {
	    return $http.post(window.location.origin + '/api/events', event);
    }, 

    delete: function(id) {
      return $http.delete(window.location.origin + '/api/events/' + id);
    }
  };

  return methods;
});
