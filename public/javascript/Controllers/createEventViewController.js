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