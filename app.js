var app = angular.module('app', ['ui.bootstrap']);

app.controller('ModalInstanceCtrl', function($scope, $modalInstance, movie) {
  $scope.movie = movie;
});

app.controller('moviesController', function($scope, $http, $modal) {
  $scope.page = 0;
  function loadPage(page) {
    $http.get("http://api.themoviedb.org/3/movie/now_playing", {
        params: {
          api_key: 'xxx',
          page: page
        }
      })
      .then(function(response) {
        $scope.results = response.data.results;
        $scope.page = response.data.page;
        $scope.pageSize = response.data.total_pages;
      });
  }
  loadPage(1);
  // MODAL WINDOW
  $scope.open = function(_movie) {
    var modalInstance = $modal.open({
      controller: "ModalInstanceCtrl",
      templateUrl: 'myModalContent.html',
      resolve: {
        movie: function() {
          return _movie;
        }
      }
    });
  };

  $scope.next = function() {
    loadPage(++$scope.page);
  }
  $scope.prev = function() {
    if ($scope.page - 1 > 0)
      loadPage(--$scope.page);
  }
});
