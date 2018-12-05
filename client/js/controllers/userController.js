angular.module('users').controller('UsersController', ['$scope', 'Users',
  function($scope, Users) {
    $scope.updateUsers = function() {
      Users.getAll().then(function(response) {
        $scope.users = response.data;
      }, function(error) {
        console.log('Unable to retrieve users:', error);
      });
    };
    $scope.updateUsers();

    $scope.addUser = function() {
      $scope.user = {
        "name": $scope.newUser.name,
        "pass": $scope.newUser.pass
      }
      var res = Users.create($scope.user);
    };

    $scope.deleteUser = function(name) {
      // First, delete all events associated with the user
      $.getJSON(window.location.origin + "/api/events", function(data){
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          if(name == obj.created_by){
            $.ajax({
              url: '/api/events/' + obj._id,
              type:'DELETE',
              success: console.log("Deleted " + obj.name)
            });
          }
        }
      })

      // Then, redirect to logout page to logout
      window.location = window.location.origin + "/logout";

      // Finally, actually delete the user
      for (var i = 0; i < $scope.users.length; i++) {
        var obj = $scope.users[i];
        if(name == obj.name){
          Users.delete(obj._id);
        }
      }
    };
  }
]);
