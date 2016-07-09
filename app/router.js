import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend( {
  location: config.locationType
} );

Router.map( function() {
	this.route( 'dashboard', { path: '/' }, function(){
		this.route( 'drivers', function(){
			this.route( 'view', { path: ':driver_id' }, function(){
				this.route( 'edit', { path: 'edit' } );
			} );
			this.route( 'add' );
		} );
		this.route( 'vehicles', function(){
			this.route( 'view', { path: ':vehicle_id' }, function(){
				this.route( 'edit', { path: 'edit' } );
			} )
			this.route( 'add' );
		} );
		this.route( 'schedules',function(){
			this.route( 'view', { path: ':schedule_id' }, function(){
				this.route( 'edit', { path: 'edit' } );
			} )
			this.route( 'add' );
		} );
	} );
} );

export default Router;
