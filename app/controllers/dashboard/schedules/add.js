import Ember from 'ember';

export default Ember.Controller.extend( {

	days: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],

	duplicateDay: function( driver_id ){
		var self = this;
		return new Ember.RSVP.Promise( function( resolve ){
			self.store.query( 'schedule', { day: self.get( 'day' ), driver_id: driver_id } )
				.then( function( dbDays ){
					resolve( dbDays.get( 'length' ) > 0 );
				} );
		} );
	},

	filterVehicles: function( daysWithVehicleId ){
		var self = this;
		return new Ember.RSVP.Promise( function( resolve ){
			var filteredVehicles = [];
			self.get( 'vehicles' ).forEach( function( car ){
				daysWithVehicleId.forEach( function( daySelected ){
					if( car.get( 'id' ) !== daySelected.get( 'vehicle_id' ) ){
						filteredVehicles.push( car );
					}
				} ) ;
			} );
			resolve( filteredVehicles );
		} );
	},

	actions: {

		goBack: function(){
			this.transitionToRoute( 'dashboard.schedules' );
		},

		daySelected: function(){
			var self = this;
			this.duplicateDay( this.get( 'driver_id' ) ).then( function( bool ){
				if( !bool ){
					self.store.query( 'schedule', { day: self.get( 'day' ) } ).then( function( dbDays ){
						var daysWithVehicleId = dbDays.filter( function( item ){
							return item.get( 'vehicle_id' ) !== null;
						} );
						if( daysWithVehicleId.length > 0 ){
							self.filterVehicles( daysWithVehicleId ).then( function( array ){
								self.set( 'availableVehicles', array );
							} );
						}
						else{
							self.set( 'availableVehicles', self.get( 'vehicles' ) );
						}
					} );
				}
				else{
					self.set( 'availableVehicles', [] );
				}
			} );
		},

		add: function(){
			var self = this;
			var schedule = this.store.createRecord( 'schedule', {
				day: this.get( 'day' ),
				driver_id: this.get( 'driver_id' ),
				vehicle_id: this.get( 'vehicle_id' )
			} );

			schedule.save().then( function(){
				self.transitionToRoute( 'dashboard.drivers' );
			} );
		}
	}
} );