angular.module('users').controller('UsersController', ['$scope', 'Users', 
  function($scope, Users) {
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