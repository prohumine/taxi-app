import Ember from 'ember';

export default Ember.Route.extend( {
	renderTemplate: function(){
		this.render( 'dasboard/drivers', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );