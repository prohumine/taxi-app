import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend( {
  location: config.locationType
} );

Router.map( function() {
	this.route( 'dashboard', { path: '/' }, function(){
		this.route( 'drivers' );
		this.route( 'vehicles' );
		this.route( 'schedules' );
	} );
} );

export default Router;
