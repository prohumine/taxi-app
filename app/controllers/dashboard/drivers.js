import Ember from 'ember';

export default Ember.Controller.extend( {

	actions: {
	
		destroy: function( driver ){
			driver.destroyRecord();
		}
	}
} );