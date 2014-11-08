/**
 * This service manages some backend actions about people such as searching, reading or updating information
 * about people.
 *
 * Author: Karl Devooght
 * Date: 07/11/2014
 */

( function( ng , appName ) {

    function PersonService( ) {}

    // UC1 S2 The service requests the list of all persons
    PersonService.prototype.search = function() {
        return 'some list of persons information';
    };

    // UC2 S2 The service requests person information with its id
    PersonService.prototype.read = function( personId ) {
        return 'some person information';
    };

    // UC3 S2 The service requests the deleting of person information with its id
    PersonController.prototype.delete = function( personId ) {
        this.scope.person = PersonService.delete( personId );
    };

    ng.module( appName ).controller( 'PersonService' , PersonService );

})( angular , 'app' );