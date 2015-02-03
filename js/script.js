// #1 create module
var moviesApp = angular.module('MoviesApp',['ui.bootstrap'])

// #2 create a controller, scope and function (passes through scope)
moviesApp.controller('SearchController', ['$scope', '$http', function($scope, $http){
  // #3 if we want to display the name, we need to add controller to the div to display
  // $scope.name = 'Claire';
  $scope.movies = {};
  $scope.searchTerm = "";
  $scope.loading = false;
  // search = function called when searching for searchTerm
  $scope.search = function() {
    $scope.loading = true;

    if ($scope.searchTerm.length < 1) {
      $scope.movies.Error = "Please insert more than one character";
      return;
    }
    console.log('doing search');

    // pop-up window of the search term once the button has been clicked (ng-submit)
    // alert($scope.searchTerm);
    var req = {
      url: 'http://www.omdbapi.com',
      params: {
        s: $scope.searchTerm,
        type: $scope.searchType
      }
    }

    $http(req).success(function(data) {
      // $scope is an object, . notation accesses it, and we're assigning the key movies a value of data
      // adding {{movies}} to the page is a way of rendering the json object to view the data object
      $scope.movies = data;
      $scope.loading = false;
      console.log('movies',data);
    })

  }

}])