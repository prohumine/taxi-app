import Ember from 'ember';

export default Ember.Route.extend( {

	model: function(){
		return this.store.findAll( 'schedule' );
	},

	renderTemplate: function(){
		this.render( 'dasboard/schedules', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );