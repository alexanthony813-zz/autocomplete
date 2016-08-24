angular
  .module('myapp', ['algoliasearch'])
  .controller('SearchCtrl', ['$scope', 'algolia', function($scope, algolia) {
    var query;

    $scope.search = {
      hits: []
    };

    var client = algolia.Client('A9EJIIWSXQ', '0ddfdbe577785a0697254cec4e2e7197');
    var index = client.initIndex('best_buy');

    $scope.update = function(){
      query = document.getElementById("search-input").value;
      index.search(query)
        .then(function searchSuccess(content) {
          // add content of search results to scope for display in view
          $scope.search.hits = content.hits;
        }, function searchFailure(err) {
          console.log(err);
      });
    }
    //autocomplete.js
    autocomplete('#search-input', {hint: false}, [
      {
        source: autocomplete.sources.hits(index, {hitsPerPage: 5}),
        displayKey: 'name',
        templates: {
          suggestion: function(suggestion) {
            return suggestion.name;
          }
        }
      }
    ]).on('autocomplete:selected', function(event, suggestion, dataset) {
      $scope.search.query = suggestion.name;
    });
  }]);
