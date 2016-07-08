import Ember from 'ember';

export default Ember.Controller.extend( {

	actions: {
		add: function(){
			var self = this;
			var driver = this.store.createRecord( 'driver', {
				firstName: this.get( 'firstName' ),
				lastName: this.get( 'lastName' )
			} );

			driver.save().then( function(){
				self.transitionToRoute( 'dashboard.drivers' );
			} );
		}
	}
} );