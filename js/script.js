// #1 create module
var moviesApp = angular.module('MoviesApp',['ui.bootstrap','ngRoute','ngMessages'])

// #2 create a controller, scope and function (passes through scope)
moviesApp.controller('SearchController', ['$scope', '$http', function($scope, $http){
  // #3 if we want to display the name, we need to add controller to the div to display
  // adding a searchTerm key and saving it
  $scope.movies = {};
  $scope.searchTerm = "";
  $scope.loading = false;
  $scope.searchTerms = JSON.parse(window.localStorage.searchTerms || "[]");

  $scope.search = function() {
    $scope.loading = true;

    if ($scope.searchTerm.length < 1) {
      $scope.movies.Error = "Please insert more than one character";
      return;
    }

    var req = {
      url: 'http://www.omdbapi.com',
      params: {
        s: $scope.searchTerm,
        type: $scope.searchType
      }
    }

    $http(req).success(function(data) {
      // $scope is an object, . notation accesses it, and we're assigning the key movies a value of data
      $scope.movies = data;
      $scope.loading = false;
      console.log('movies',data);

      $scope.searchTerms.push($scope.searchTerm);
      window.localStorage.searchTerms = JSON.stringify($scope.searchTerms);
    })

  }

  if ($scope.searchTerm) {
    $scope.search();
  }

}]);

moviesApp.controller('ShowController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
  $scope.id = $routeParams.id

  var req = {
    url: 'http://www.omdbapi.com',
    params: {
      i: $scope.id
    }
  }

  $http(req).success(function(movie_data) {
    $scope.movie = movie_data
    console.log('movie: ', movie_data);
  })


}]);

moviesApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '/landing.html',
      controller: 'SearchController'
    })
    .when('/search', {
      templateUrl: '/search.html',
      controller: 'SearchController'
    })
    .when('/movie/:id', {
      templateUrl: '/movie.html',
      controller: 'ShowController'
    })

    $locationProvider.hashPrefix('!');

}]);


