import Ember from 'ember';

export default Ember.Route.extend( {
	model: function(){
		return this.store.findAll( 'driver' );
	},

	setupController: function( controller, model ){
		controller.set( 'model', model );
		controller.set( 'isDoingSomething', false );
	},

	renderTemplate: function(){
		this.render( 'dasboard/drivers', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );