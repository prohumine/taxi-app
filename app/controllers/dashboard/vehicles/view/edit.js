import Ember from 'ember';

export default Ember.Controller.extend( {

	actions: {

		goBack: function(){
			this.transitionToRoute( 'dashboard.vehicles' );
		},

		update: function(){
			var self = this;
			var vehicle = this.get( 'model' );
			vehicle.save().then( function(){
				self.transitionToRoute( 'dashboard.vehicles' );
			} );
		}
	}
} );