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
				var driver = self.store.createRecord( 'driver', {
					firstName: self.get( 'firstName' ),
					lastName: self.get( 'lastName' )
				} );

				driver.save().then( function(){
					self.get( 'notify' ).success( 'Driver Saved' );
					self.transitionToRoute( 'dashboard.drivers' );
				} ).catch( function( err ){} );
			} );
		}
	}
} );