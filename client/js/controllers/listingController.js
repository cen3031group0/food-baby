angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    $scope.updateListings = function() {
      Listings.getAll().then(function(response) {
        $scope.listings = response.data;
      }, function(error) {
        console.log('Unable to retrieve listings:', error);
      });
    };
    $scope.updateListings();

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
      $scope.listing = {
        "name": $scope.newListing.name,
        "address": $scope.newListing.address,
        "building": $scope.newListing.building,
        "room": $scope.newListing.room,
        "time": $scope.newListing.time,
        "host": $scope.newListing.host,
        "dietary_prefs": $scope.newListin.dietary_prefs,
        "created_at": $scope.newListing.created_at,
        "updated_at": $scope.newListing.updated_at
      }
      var res = Listings.create($scope.listing);
      $scope.updateListings();
    };

    $scope.deleteListing = function(id) {
      Listings.delete(id);
      $scope.updateListings();
    };

    $scope.showDetails = function(id) {
      $scope.listings.forEach(function(listing) {
        if (listing._id == id) {
          $scope.detailedInfo = listing;
        }
      });
    };
  }
]);