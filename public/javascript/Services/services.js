/**
 * Created by niesler on 27.05.2016.
 */
var app = angular.module( "routerApp" );
app.service("cookieUserManagement", function( userClient, $cookies ){
    /**
     * The function makes an ReST request to get all user information including
     * the userID and saves them as keyValue pairs in Cookies
     * @param username
     * @param password
     * @param callback
     */
    this.loginUserWithCookie = function( username, password, callback) {
        // Definition of keys for the properties saved by the Cookie
        var usernameKey = "username";
        var userIdKey = "userId";
        var userDataKey = "UserData";
        userClient.loginUser(username, password, function( success, userLoginData ){
            if ( success ){
                // save the returned id
                $cookies.put( userIdKey, userLoginData.user.id );
                // save the returned nickname
                $cookies.put( usernameKey, userLoginData.user.nickname );
                // Get the missing userData
                userClient.getUserByName(userLoginData.user.nickname, function( success, userData ){
                    if( success ){
                        // save the additional userInformation
                        $cookies.putObject( userDataKey, userData.user );
                        callback( true );
                    } else{
                        alert("User Login failed while getting additional data");
                        callback( false );
                    }
                });
            } else{
                alert("User Login failed");
                callback( false )
            }
        });
        /**
         * retruns the UserId
         * @returns {*|string}
         */
        this.getUserId = function(){
          return $cookies.get( userIdKey );
        };
        /**
         * returns the UserName
         * @returns {*|string}
         */
        this.getUsername = function() {
            return $cookies.get( usernameKey );
        };
        /**
         * returns the userData as an object
         * you can get access to the user properties by
         * the dot notation object.property
         * @returns {*|Object}
         */
        this.getUserData = function(){
          return $cookies.getObject( userDataKey );
        };
        /**
         * deletes all stored user related cookies
         */
        this.logoutUserWithCookie = function(){
            $cookies.remove( usernameKey );
            $cookies.remove( userIdKey );
            $cookies.remove( userDataKey );
        };
    }
})
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
     * This function will create a private User event??? -- muss noch ausprobiert werden
     * @param userId
     * @param eventObject
     * @param callback
     */
    this.createUserEvent = function( userId, eventObject, callback ) {
        // wird wohl nicht funktionieren - backend implementierung erfordert wohl query parameter!!
        // wird gefixt sobald das cookie user management funktioniert!!
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
/**
 * Created by niesler on 28.05.2016.
 */
var app = angular.module( "routerApp" );
app.service("objectStore", function(  ){
    var recipientStore = new HashMap();
    /**
     * packages the Object into a message object and
     * add it at the last position of the recipient's own
     * messageStore (Array)
     * no return value
     * @param recipient
     * @param sender
     * @param objectToSend
     */
    this.sendObject = function( recipient, sender, objectToSend ){

        // package the object into a message object
        var message = {
            from: sender,
            to: recipient,
            message: objectToSend
        };
        // if there is no Store for the recipient register a new one
        if( ! recipientStore.has( recipient ) ){
            var newMessageStore = new Array();
            recipientStore.set( recipient, newMessageStore );
        }
        // get the recipient's messageStore (Array)
        var messageStore = recipientStore.get( recipient );
        messageStore.push( message );
        // update the HashMap
        recipientStore.set(recipient, messageStore );
    };
    /**
     * This function will return all messages for the recipient as an array
     * The array contains message objects (have a from, to, and a message property
     * To access the message just do Array[ itemNumber ].message
     * In case of error or failure it will return null
     * @param recipient
     * @returns {*}
     */
    this.getAllMessagesAsArray = function( recipient ){
        if( recipientStore.has( recipient )){
            return recipientStore.get( recipient );
        }
        else{
            return null;
        }
    };
    /**
     * This will return a message object
     * The first message arrived will be returned
     * if there is no message or a failure null will be returned
     * @param recipient
     * @returns {*}
     */
    this.getFirstMessage = function( recipient ){
        if( recipientStore.has( recipient ) ){
            var messageStore = recipientStore.get( recipient );
            // check if the array is not empty
            if( messageStore.length != 0 ) {
                    return messageStore.shift(); // removes and returns first element of the array
            } else {
                    return null;
            }
        } else{
            return null;
        }
    };
    /**
     * This will return a message object
     * The last message that arrived will be returned
     * if there is no message or a failure occurs null is returned
     * @param recipient
     * @returns {*}
     */
    this.getLatestMessage = function ( recipient ){
        if ( recipientStore.has( recipient ) ){
            var messageStore = recipientStore.get( recipient );
            if( messageStore.length != 0 ) {
                return messageStore.pop(); // removes and returns last element of the message array
            } else {
                return null;
            }
        } else{
            return null;
        }
    };
    /**
     * pass the message object you have received e.g. by getLatestMessage
     * as the parameter and you will get the wrapped object.
     * @param message
     * @returns {*}
     */
    this.unpackMessage = function( message ){
        return message.message;
    };
    /**
     * pass the message object you have received e.g. by getLatestMessage
     * as the parameter and you will get the sender
     * @param message
     * @returns {*}
     */
    this.unpackFrom = function( message ){
      return message.from;
    };/**
     * pass the message object you have received e.g. by getLatestMessage
     * as the parameter and you will get the recipient
     * @param message
     * @returns {*}
     */
    this.unpackTo = function( message ){
        return message.to;
    };
    /**
     * This will delete the recipient from the recipientStore
     * use this to drop all messages at once
     * @param recipient
     */
    this.deleteRecipient = function( recipient ){
        if( recipientStore.has( recipient ) ){
            recipientStore.remove( recipient );
        }
    };

    /**
     * This will remove everything from the entire recipientStore and
     * every recipients messageStores will be lost.
     */
    this.clearAll = function(){
      recipientStore.clear();
    };

});