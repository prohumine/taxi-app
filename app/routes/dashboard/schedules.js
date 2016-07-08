import Ember from 'ember';

export default Ember.Route.extend( {
	renderTemplate: function(){
		this.render( 'dasboard/schedules', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );