import Ember from 'ember';

export default Ember.Controller.extend( {

	actions: {
		goBack: function(){
			this.transitionToRoute( 'dashboard.vehicles' );
		},
		
		add: function(){
			var self = this;
			var vehicle = this.store.createRecord( 'vehicle', {
				make: this.get( 'make' ),
				model: this.get( 'Model' ),
				licensePlate: this.get( 'licensePlate' )
			} );

			vehicle.save().then( function(){
				self.transitionToRoute( 'dashboard.vehicles' );
			} );
		}
	}
} );