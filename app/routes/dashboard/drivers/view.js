import Ember from 'ember';

export default Ember.Route.extend( {
	model: function( params ){
		return this.store.find( 'driver', params.driver_id );
	},

	setupController: function( controller, model ){
		controller.set( 'model', model );
		this.store.query( 'schedule', { driver_id: model.id } ).then( function( days ){
			controller.set( 'driverSchedule', days );
		} );
	},

	renderTemplate: function(){
		this.render( 'dasboard/drivers/view', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );