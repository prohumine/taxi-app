import Ember from 'ember';

export default Ember.Controller.extend( {

	actions: {
		update: function(){
			var self = this;
			var driver = this.get( 'model' );
			driver.save().then( function(){
				self.transitionToRoute( 'dashboard.drivers' );
			} );
		}
	}
} );