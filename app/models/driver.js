import DS from 'ember-data';

export default DS.Model.extend( {
	firstName: DS.attr(),
	lastName: DS.attr(),

	fullName: function(){
		return this.get( 'firstName' ) + ' ' + this.get( 'lastName' );
	}.property( 'firstName', 'lastName' )
} );