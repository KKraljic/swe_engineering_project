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