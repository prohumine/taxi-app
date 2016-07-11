import Ember from 'ember';

export default Ember.Controller.extend( {

	sortedDays: function(){
		var self = this;
		var allDays = Ember.A( [
			{ day: 'Monday', drivers: Ember.A(), vehicles: Ember.A() },
			{ day: 'Tuesday', drivers: Ember.A(), vehicles: Ember.A() },
			{ day: 'Wednesday', drivers: Ember.A(), vehicles: Ember.A() },
			{ day: 'Thursday', drivers: Ember.A(), vehicles: Ember.A() },
			{ day: 'Friday', drivers: Ember.A(), vehicles: Ember.A() },
			{ day: 'Saturday', drivers: Ember.A(), vehicles: Ember.A() },
			{ day: 'Sunday', drivers: [], vehicles: [] }
		] );
		allDays.forEach( function( day ){
			self.get( 'model' ).forEach( function( obj ){
				if( day.day === obj.get( 'day' ) ){
					day.drivers.push( obj.get( 'driver' ) );
					day.vehicles.push( obj.get( 'vehicle' ) );
				}
			} );
		} );
		return allDays;
	}.property()
} );