import Ember from 'ember';

export default Ember.Route.extend( {
	model: function( params ){
		return this.store.find( 'vehicle', params.vehicle_id );
	},

	setupController: function( controller, model ){
		controller.set( 'model', model );
		this.store.query( 'schedule', { vehicle_id: model.id } ).then( function( days ){
			controller.set( 'vehicleSchedule', days );
		} );
	},

	renderTemplate: function(){
		this.render( 'dasboard/vehicles/view', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );