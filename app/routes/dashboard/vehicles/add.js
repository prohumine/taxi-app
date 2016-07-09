import Ember from 'ember';

export default Ember.Route.extend( {

	renderTemplate: function(){
		this.render( 'dasboard/vehicles/add', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );