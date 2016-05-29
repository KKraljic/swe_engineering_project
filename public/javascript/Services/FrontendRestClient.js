//  get the main module
var app = angular.module( "routerApp" );
// all ReST request go to a subset of the /service url
var baseUrl = "/service";
/**
 * A service that manages the user via ReST calls
 */
app.service( "userClient", function( $http ) {
    /* the userClient refers to the ReST user resource
       the url is hereby /service/user
    */
    var userServiceURL = baseUrl + "/user";
    /**
     * This function retrieves the user information by nickname
     * The callback is passed two parameters the first is boolean value indicating
     * if the call was successful or not the second is the actual response body,
     * in case of failure it defaults to null
     *  username - the username/nickname to look up
     *  callback - the function to be called once the ReST request is complete
     * @param username
     * @param callback
     */
    this.getUserByName = function( username, callback ) {
        // URL: /service/user/{username}
        var getUserUrl = userServiceURL + "/" + username;
        // $http call
        var promise = $http.get( getUserUrl );
        promise.then(
            // success case
            function( response ) {
                // response.data holds the http json body returned by the call
                callback( true, response.data ); // response.data should be an object
            },
            // failure case
            function() {
                callback( false, null );
            }
        );

    };
    /**
     * Get the user events
     * The callback is passed two parameters the first is boolean value indicating
     * if the call was successful or not the second is the actual response body,
     * in case of failure it defaults to null
     * @param userId
     * @param callback
     */
    this.getUserEvents = function( userId, callback ) {

        var userEventUrl = userServiceURL + "/" + userId + "/events";
        var promise = $http.get( userEventUrl );
        promise.then(
            // success case
            function( response ) {
                // response.data holds the http json body returned by the call
                callback( true, response.data );
            },
            // failure case
            function() {
                callback( false, null );
            }
        );
    };
    /**
     * Get the user categories
     * @param userId
     * @param callback
     * @returns {null}
     */
    this.getUserCategories = function( userId, callback ) {
        
        // Not implemented in the backend yet
        return null;
    };
    /**
     * This will register a new user
     *  - userObject is an object like the model within the database
     *  - callback the function that will be called when the request finishes
     *  The callback has one parameter only indicating a success or failure
     * @param userObject
     * @param callback
     */
    this.registerNewUser = function( userObject, callback ) {
        // URL: /service/user/
        var registerUrl = userServiceURL + "/";

        var promise = $http.post( registerUrl, userObject );
        promise.then(
            // success case
            function() {
                callback( true );
            },
            // failure case
            function() {
                callback( false );
            }
        );
    };
    /**
     * The user login, the request returns the user's nickname
     * and the unique id within the database,
     * This call should be only used within the user management functionality
     * - username The username of the user
     * - password The password of the user
     * - callback function to be called when request finishes
     *            first parameter indicates success or failure, the second
     *            is the actual object containing nickname and id, which is
     *            in case of failure set to null
     * @param username
     * @param password
     * @param callback
     */
    this.loginUser = function( username, password, callback ) {
        var loginUrl = userServiceURL + "/login?" + "nickname=" + username + "&" + "password=" + password;
        var promise = $http.get( loginUrl );
        promise.then(
            // success case
            function( response ) {
                var userObj = response.data;
                callback( true, userObj );
            },
            // failure case
            function() {
                callback( false, null );
            }
        );
    };
    /**
     * This function will create a private User event -- not supported yet
     * @param userId
     * @param eventObject
     * @param callback
     */
    this.createUserEvent = function( userId, eventObject, callback ) {
        // not supported yet, maybe in future implementation
        var userEventUrl = userServiceURL + "/" + userId + "/events";
        var promise = $http.post( userEventUrl, eventObject );
        promise.then(
            function() {
                callback( true );
            },
            function() {
                callback( false );
            }
        );
    };
} );
/**
 * A service managing all events via the ReST API
 */
app.service( "eventClient", function( $http ) {
        // URL: /service/events
        var eventServiceUrl = baseUrl + "/events";
    /**
     * Get all available events on the server
     * - callback function called when request finishes
     *      first parameter indicates success or failure
     *      second parameter is the an object with an eventlist property (array)
     * @param callback
     */
        this.getAllEvents = function( callback ) {
            var getAllUrl = eventServiceUrl + "/";
            var promise = $http.get( getAllUrl );
            promise.then(
                // success case
                function( response ) {
                    // response.data is an object that holds the http response body
                    callback( true, response.data );
                },
                // failure case
                function() {
                    callback( false, null );
                }
            );
        };
    /**
     * This function will create an event on the server
     *  - eventObject the event that should be created on the server
     *  - callback function called when the request finishes,
     *      only one parameter indicatin success or failure
     * @param eventObject
     * @param callback
     */
        this.createNewEvent = function( eventObject, callback ) {
            var createEventUrl = eventServiceUrl + "/";
            var promise = $http.post( createEventUrl, eventObject );
            promise.then(
                // success case
                function() {
                    callback( true );
                },
                // failure case
                function() {
                    callback( false );
                }
            );
        };
        this.updateEvent = function( eventId, callback ) {

        };

        this.deleteEvent = function( eventId, callback ) {

        };
    }
);

app.service( "itemEditor", function( $http ) {
        this.getItemList = function( eventId, callback ) {

        };

        this.createItemList = function( eventId, callback ) {

        };

        this.updateItemList = function( eventId, callback ) {

        };

        this.deleteItemList = function( eventId, callback ) {

        };
    }
);

app.service( "categoryClient", function() {
        this.getAllCategories = function( page, callback ) {

        };

        this.createCategory = function( categoryObject, callback ) {

        };

        this.getCategory = function( categoryId, callback ) {

        };

        this.updateCategory = function( categoryId, callback ) {

        };

    }

);