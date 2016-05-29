/**
 * Created by niesler on 28.05.2016.
 */
var app = angular.module("routerApp");

var loginViewController = function ($scope, $location, cookieUserManagement, objectStore ) {
    var creditentials = {
        username: "user",
        password: "pw"
    };
    $scope.creditentials = creditentials;

    var welcomeMessage = {
        message: ""
    };
    $scope.welcomeMessage = welcomeMessage;
    $scope.initLogin = function() {

        var message = objectStore.getFirstMessage("loginViewController");
        if (message != null) {
            var receivedMessage = objectStore.unpackMessage(message);
            welcomeMessage.message = "Welcome " + receivedMessage.nickname;
        }

    };
    $scope.loginUser = function () {
        cookieUserManagement.loginUserWithCookie(creditentials.username, creditentials.password, function (success) {
            if (success) {
                $location.path("home");
            } else {
                alert("Your login failed");
            }
        });
    };
};
app.controller( "loginViewController", loginViewController);