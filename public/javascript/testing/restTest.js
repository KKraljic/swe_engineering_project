describe( "TestUserService", function() {
   var $httpBackend;
   var userClient;
   
   // Inject the tested ReSTClient service module
   beforeEach( module( "appRestClient" ) );
   // Inject the mocked http module before each test 
   beforeEach( inject( function( _$httpBackend_, _UserClient_ ) {
       $httpBackend = _$httpBackend_;
       userClient = _UserClient_;
   } ) );
   // 
   afterEach( function() {
       // Check wether all asynchronious request have been resolved
       $httpBackend.verifyNoOutstandingRequest();
   } );
   
   it( "it should return the user information", function() {
       $httpBackend.expectGET( "/service/user/test" ).respond( 200,
       {
            "nickname": "test",
            "firstname": "User1",
            "lastname": "miller",
            "password": "12345",
            "properties": {
                "mobilephone": "012345",
                "email": "user@mail.com",
                "facebook": "",
                "birthday": "19.05.1995",
                "registertime": 127050
            }
       }
     );
       userClient.getUsers();
   } );
   
} );
