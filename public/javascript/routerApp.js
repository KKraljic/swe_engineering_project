 var routerApp = angular.module( "routerApp", [ "ui.router", "ngCookies" ] );

routerApp.config( function( $stateProvider, $urlRouterProvider ) {
    
    $urlRouterProvider.otherwise( "index.html" );
    
    $stateProvider
        .state( "create_event", {
            url: "/create_event",
            views: {
                "main-view": { templateUrl: "../html/create_event.html" }
            }       
        } )
        
        .state( "home", {
            url: "/home",
            views: {
                "main-view": { templateUrl: "../html/home.html" }
            }
        } )
        .state( "index", {
            url: "/index",
            views: {
                "main-view": { templateUrl: "../html/partial-index.html" }
            }
        } )
        .state( "login", {
            url: "/login",
            views: {
                "main-view": { templateUrl: "../html/login.html" }
            }
        } )
        .state(
            "logout_places", {
                url: "/logout",
                views: {
                    "main-view": { templateUrl: "../html/logout.html" }
                }
            }
        )
        .state( "register", {
            url: "/register",
            views: {
                "main-view": { templateUrl: "../html/register.html" }
            }
        } )
        .state( "see_events", {
            url: "/see_events",
            views: {
                "main-view": { templateUrl: "../html/see_events.html" }
            }
        } ) 
        .state( "see_detailed_view", {
             url: "/event_details",
             views: {
                 "main-view": { templateUrl: "../html/see_details.html" }
                 } 
        } );          
} );
