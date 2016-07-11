import Ember from 'ember';

export default Ember.Route.extend( {
	model: function(){
		return this.store.findAll( 'vehicle' );
	},

	renderTemplate: function(){
		this.render( 'dasboard/vehicles', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );