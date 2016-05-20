var app = angular.module("ethics-app");


// PUT
app.controller("DocConfirmController", function($scope, $routeParams, $location, $docService, $window) {

    // API
    $scope.loadData = function() {
        $docService.get($routeParams.doc_id).success(function(response) {
            console.log("Check confirm get");
            $scope.doc = response;
            $scope.icf_eng = angular.copy($scope.doc._id + "_eng.pdf");
            $scope.icf_ger = angular.copy($scope.doc._id + "_ger.pdf");
        });
        // Call pdf generation function
        $docService.pdf($routeParams.doc_id).success(function(response) {
          console.log("Check confirm pdf");
        });

    };

    // INIT
    $scope.loadData();
    $scope.validateEthics = function() {
      return false
    };

});
