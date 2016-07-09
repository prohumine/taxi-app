import Ember from 'ember';

export default Ember.Route.extend( {

	model: function(){
		return this.store.findAll( 'driver' );
	},

	setupController: function( controller, model ){
		controller.set( 'drivers', model );
		this.store.findAll( 'vehicle' ).then( function( vehicles ){
			controller.set( 'vehicles', vehicles );
		} );
	},

	renderTemplate: function(){
		this.render( 'dasboard/schedules/add', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );