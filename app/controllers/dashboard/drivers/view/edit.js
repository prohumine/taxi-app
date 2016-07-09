import Ember from 'ember';

export default Ember.Controller.extend( {

	actions: {

		goBack: function(){
			this.transitionToRoute( 'dashboard.drivers' );
		},

		update: function(){
			var self = this;
			var driver = this.get( 'model' );
			driver.save().then( function(){
				self.transitionToRoute( 'dashboard.drivers' );
			} );
		}
	}
} );