angular.module('users').controller('UsersController', ['$scope', 'Users', 
  function($scope, Users) {
    $scope.updateUsers = function() {
      Users.getAll().then(function(response) {
        $scope.users = response.data;
      }, function(error) {
        console.log('Unable to retrieve users:', error);
      });
    };

    $scope.addUser = function() {
      $scope.user = {
        "name": $scope.newUser.name,
        "pass": $scope.newUser.pass
      }
      var res = Users.create($scope.user);
    };

    $scope.deleteUser = function(id) {
      Users.delete(id);
    };
  }
]);