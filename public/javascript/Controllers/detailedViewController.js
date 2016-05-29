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
