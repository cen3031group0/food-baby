angular.module('events').controller('EventsController', ['$scope', 'Events', 
  function($scope, Events) {
    $scope.updateEvents = function() {
      Events.getAll().then(function(response) {
        $scope.events = response.data;
      }, function(error) {
        console.log('Unable to retrieve events:', error);
      });
    };
    $scope.updateEvents();

    $scope.detailedInfo = undefined;

    $scope.addEvent = function(user) {
      console.log(user);
      $scope.event = {
        "name": $scope.newEvent.name,
        "address": $scope.newEvent.address,
        "building": $scope.newEvent.building,
        "room": $scope.newEvent.room,
        "time": $scope.newEvent.time,
        "host": $scope.newEvent.host,
        "dietary_prefs": $scope.newEvent.dietary_prefs,
        "created_at": $scope.newEvent.created_at,
        "updated_at": $scope.newEvent.updated_at,
        "created_by": user
      }
      var res = Events.create($scope.event);
      $scope.updateEvents();
    };

    $scope.deleteEvent = function(id) {
      Events.delete(id);
      $scope.updateEvents();
    };

    $scope.showDetails = function(id) {
      $scope.events.forEach(function(event) {
        if (event._id == id) {
          $scope.detailedInfo = event;
        }
      });
    };
  }
]);