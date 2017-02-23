var app = angular.module("ethics-app");


// Document delete controller
app.controller("documentDeleteController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [changeTab description]
     * @param  {[type]} tab [description]
     * @return {[type]}     [description]
     */
    $scope.changeTab = function(tab){
        $scope.tab = tab;
    };

    /**
     * [redirect description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    $scope.redirect = function(path){
        $location.url(path);
    };

    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        if($authenticationService.get()){
            $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
        } else {
            $scope.redirect("/");
        }
    };

    /**
     * [deleteDocument description]
     * @return {[type]} [description]
     */
    $scope.deleteDocument = function(){
        $scope.changeTab(0);

        $documentService.delete($documentService.getId())
        .success(function(response) {
            // Reset
            $documentService.set();

            // Update navbar
            $rootScope.$broadcast('resetNavbar');

            $scope.redirect("/");
        })
        .error(function(response) {
            $window.alert(response);
        });
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.changeTab(0);
    $scope.input = "";
    $scope.document = $documentService.get();
    $scope.changeTab(1);

});
