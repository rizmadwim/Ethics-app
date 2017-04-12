var app = angular.module("ethics-app");


// Institute list controller
app.controller("instituteListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $instituteService, _) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [redirect description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    $scope.redirect = function(path){
        $location.url(path);
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading institutes" };

    // Load institutes
    $instituteService.list()
    .then(function onSuccess(response) {
        $instituteService.set(response.data);
        $scope.institutes = $instituteService.get();
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});