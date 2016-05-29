/**
 * Created by niesler on 28.05.2016.
 */
var app = angular.module("routerApp");

var createEventViewController = function( $scope, $location, eventClient, cookieUserManagement ) {
    var newEvent = {
        "title": "",
        "description": "",
        "eventtime": "",
        "eventdate": new Date(),
        "onFacebook": false,
        "public": false
    };
    $scope.newEvent = newEvent;
    $scope.submit = function () {
        // Set date and time not using ng-model
        var eventDate = document.getElementById("event_date").value;
        var eventTime = document.getElementById("event_time").value;
        newEvent.eventtime = eventTime;
        var time_array = eventTime.split(":");
        var dateObj = new Date(eventDate);
        dateObj.setHours(time_array[0]);
        dateObj.setMinutes(time_array[1]);
        newEvent.eventdate = dateObj;
        newEvent.eventowner = cookieUserManagement.getUserId();
        var output = JSON.stringify( newEvent );
        eventClient.createNewEvent( output, function( success ) {
            if ( success ) {
                alert( "Sucessfully created event" );
                $location.path( "see_events" );
            } else {
                alert( "Event creation failed" );
            }
        });

    };
};
app.controller( "createEventViewController", createEventViewController );
var app = angular.module("routerApp");

var detailedViewController = function( $scope, $location, objectStore ) {
    var eventDetails = {};
    $scope.loadDetails = function( ) {
        var receivedMessage = objectStore.getFirstMessage( "detailedViewController" );
        if ( receivedMessage != null ) {
            eventDetails = objectStore.unpackMessage( receivedMessage );
            $scope.eventDetails = eventDetails;
        } else {
            alert( "Sorry, but there are no details for this event available!" );
        }
    };

};

app.controller( "detailedViewController", detailedViewController );

/**
 * Created by niesler on 28.05.2016.
 */
var app = angular.module("routerApp");

var getAllEventsController = function( $scope, $location, eventClient, objectStore ) {
    $scope.getAllEvents = function( ) {
        eventClient.getAllEvents( function( success, eventList ) {
            if ( success ) {
                $scope.eventList = eventList.eventlist;
            } else {
                alert( "No event available in the database." );
            }
        } );
    };

    $scope.getDetails = function( eventId ) {
        var detailedObject ;
        var searchedEventId = eventId;

        eventClient.getAllEvents( function( success, eventList ) {
            if ( success ) {
                $scope.eventList = eventList.eventlist;
                for ( var i = 0; i < $scope.eventList.length; i++ ) {
                    if ( $scope.eventList[ i ]._id == searchedEventId ) {
                         detailedObject = $scope.eventList[ i ];
                    }
                }
                
                objectStore.sendObject( "detailedViewController", "getAllEventsController", detailedObject );
                $location.path( "event_details" );
             }
        } );

    };
};
app.controller( "getAllEventsController", getAllEventsController);
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