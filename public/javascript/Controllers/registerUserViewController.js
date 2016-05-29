/**
 * Created by niesler on 28.05.2016.
 */
var app = angular.module("routerApp");

var registerUserViewController = function ($scope, $location, userClient, objectStore ) {
    var user = {
        "nickname": "username",
        "password": "secret",
        "firstname": "name",
        "lastname": "lastname",
        "properties": {
            "mobilephone": "123456",
            "facebook": "facebookLink",
            "birthday": ""
        }
    };
    $scope.user = user;
    $scope.submit = function () {

        // Set the birthday element since ng-model does not work with bootstrap date-picker
        user.properties.birthday = document.getElementById("birthday").value;
        userClient.registerNewUser(JSON.stringify(user), function (success) {
            if (success) {
                objectStore.sendObject( "loginViewController", "registerUserViewController", user);
                $location.path( "login" );
            } else {
                alert("The registration failed");
            }
        });
    };
};

app.controller( "registerUserViewController" , registerUserViewController );