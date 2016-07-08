import Ember from 'ember';

export default Ember.Route.extend( {
	renderTemplate: function(){
		this.render( 'dasboard/vehicles', {
			outlet: 'shared',
			into: 'dashboard'
		} )	
	}
} );