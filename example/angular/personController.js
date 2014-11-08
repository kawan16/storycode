/**
 * This controller manages some actions about people such as searching, reading or updating information
 * about people.
 *
 * Author: Karl Devooght
 * Date: 07/11/2014
 */

( function( ng , appName ) {

    function PersonController( $scope , PersonService ) {
        this.scope = $scope;
        this.service = PersonService;
        this.scope.searchPerson = ng.bind( this , this.searchPerson() );
        this.scope.readPerson = ng.bind( this , this.readPerson() );
        this.scope.deletePerson = ng.bind( this , this.deletePerson() );
    }

    // UC1 S1 The controller searches the list of all persons
    PersonController.prototype.searchPerson = function() {
        this.scope.listPerson = PersonService.search();
    };

    // UC2 S1 The controller reads person information with its id
    PersonController.prototype.readPerson = function( personId ) {
        this.scope.person = PersonService.read( personId );
    };

    // UC3 S1 The controller deletes person information with its id
    PersonController.prototype.deletePerson = function( personId ) {
        PersonService.delete( personId );
    };

    ng.module( appName ).controller( 'PersonController' , PersonController );

})( angular , 'app' );