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
      var promises = [];
      $.getJSON(window.location.origin + "/api/events").then(function(data){
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          if(name == obj.created_by){
            var request = $.ajax({
              url: '/api/events/' + obj._id,
              type:'DELETE',
              success: console.log("Deleted " + obj.name)
            });
            promises.push(request);
          }
        }
        // Then, redirect to logout page to logout
        $.when.apply(null, promises).done(function(){
           window.location = window.location.origin + "/logout";
        })
      });

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
