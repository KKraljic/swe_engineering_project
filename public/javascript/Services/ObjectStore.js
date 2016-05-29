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