angular
  .module('myapp', ['algoliasearch'])
  .controller('SearchCtrl', ['$scope', 'algolia', function($scope, algolia) {

    $scope.search = {
      query: '',
      hits: []
    };
    var client = algolia.Client('A9EJIIWSXQ', '0ddfdbe577785a0697254cec4e2e7197');
    var index = client.initIndex('best_buy');

    index.search($scope.search.query)
        .then(function searchSuccess(content) {
          console.log(content);
          // add content of search results to scope for display in view
          $scope.search.hits = content.hits;
        }, function searchFailure(err) {
          console.log(err);
      });

    $scope.$watch('search.query', function() {
      console.log('hiiii')
      index.search($scope.search.query)
        .then(function searchSuccess(content) {
          console.log(content);
          // add content of search results to scope for display in view
          $scope.search.hits = content.hits;
        }, function searchFailure(err) {
          console.log(err);
      });
    });
  }]);