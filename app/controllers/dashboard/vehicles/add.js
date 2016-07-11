import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend( EmberValidations, {

	notify: Ember.inject.service( 'notify' ),

	validations: {
		'make': {
			presence: {
				presence: true,
				message: "Make can't be blank"
			}
		},
		'Model': {
			presence: {
				presence: true,
				message: "Model can't be blank"
			}
		},
		'licensePlate': {
			presence: {
				presence: true,
				message: "licensePlate can't be blank"
			}
		}
	},

	actions: {
		goBack: function(){
			this.transitionToRoute( 'dashboard.vehicles' );
			this.set( 'make', null );
			this.set( 'Model', null );
			this.set( 'licensePlate', null );
			this.set( 'errors', [] );
		},
		
		add: function(){
			var self = this;
			this.validate().then( function(){
				var vehicle = self.store.createRecord( 'vehicle', {
					make: self.get( 'make' ),
					model: self.get( 'Model' ),
					licensePlate: self.get( 'licensePlate' )
				} );
				vehicle.save().then( function(){
					self.get( 'notify' ).success( 'Vehicle has been added' );
					self.transitionToRoute( 'dashboard.vehicles' );
				} ).catch( function( res ){
					self.get( 'notify' ).alert( res.errors[ 0 ].message );
				} );
			} );
		}
	}
} );