import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend( EmberValidations, {

	notify: Ember.inject.service( 'notify' ),

	validations: {
		'firstName': {
			presence: {
				presence: true,
				message: "Driver first name can't be blank"
			}
		},
		'lastName': {
			presence: true
		}
	},

	actions: {
		goBack: function(){
			this.transitionToRoute( 'dashboard.drivers' );
		},
		
		add: function(){
			var self = this;
			this.validate().then( function(){
				var driver = this.store.createRecord( 'driver', {
					firstName: this.get( 'firstName' ),
					lastName: this.get( 'lastName' )
				} );

				driver.save().then( function(){
					self.get( 'notify' ).success( 'Driver Saved' );
					self.transitionToRoute( 'dashboard.drivers' );
				} );
			} ).catch( function( err ){
				self.get( 'notify' ).alert( self.get( 'errors.firstName' ).objectAt(0) );
			} );
		}
	}
} );