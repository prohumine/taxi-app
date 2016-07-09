import Ember from 'ember';

export default Ember.Route.extend( {
	model: function(){
		return this.store.findAll( 'driver' );
	},
	
	renderTemplate: function(){
		this.render( 'dasboard/drivers', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );