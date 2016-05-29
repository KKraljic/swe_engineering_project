/**
 * Created by niesler on 28.05.2016.
 */
var app = angular.module("routerApp");

var logoutController = function( $scope, $location, $interval, cookieUserManagement ){
    $scope.logout = function(){
        // Delete the cookies created by login -- logical logout
        cookieUserManagement.logoutUserWithCookie();
        // Define the function to forward to login screen
        var delayedSiteForward = function(){
            $location.path("login");
        };
        // forward to the login page after a delay of 5 sec (repeated only once)
        $interval(delayedSiteForward, 5000, 1);
    };
};
app.controller("logoutController", logoutController);