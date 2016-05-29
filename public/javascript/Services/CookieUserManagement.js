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