import Ember from 'ember';

export default Ember.Route.extend( {
	renderTemplate: function(){
		this.render();
		this.render( 'welcome', {
			outlet: 'shared',
			into: 'dashboard'
		} );
	}
} );