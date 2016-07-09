import Ember from 'ember';

export default Ember.Route.extend( {

	model: function(){
		return this.store.findAll( 'driver' );
	},

	setupController: function( controller, model ){
		controller.set( 'drivers', model );
		controller.set( 'driver', null );
		controller.set( 'vehicle', null );
		controller.set( 'day', null );
	},

	renderTemplate: function(){
		this.render( 'dasboard/schedules/add', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );