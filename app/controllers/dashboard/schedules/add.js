import Ember from 'ember';

export default Ember.Controller.extend( {

	days: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],

	duplicateDay: function(){
		var self = this;
		return new Ember.RSVP.Promise( function( resolve, reject ){
			self.store.query( 'schedule', { day: self.get( 'day' ), driver_id: self.get( 'driver.id' ) } )
				.then( function( dbDays ){
					resolve( dbDays.get( 'length' ) > 0 )
				} ) 
		} );
	},

	filteredVehicles: function( filtered ){
		var self = this;
		return new Ember.RSVP.Promise( function( resolve, reject ){
			var something = [];
			self.get( 'vehicles' ).forEach( function( car ){
				filtered.forEach( function( daySelected ){
					if( car.get( 'id' ) !== daySelected.get( 'vehicle_id' ) ){
						something.push( car );
					};
				} ) ;
			} );
			resolve( something );
		} );
	},

	actions: {

		goBack: function(){
			this.transitionToRoute( 'dashboard.schedules' );
		},

		driverSelected: function( driver ){
			var self = this;
			this.set( 'driver', driver );
			this.store.findAll( 'vehicle' ).then( function( vehicles ){
				self.set( 'vehicles', vehicles );
			} );
		},

		daySelected: function( day ){
			var self = this;
			this.duplicateDay().then( function( bool ){
				if( !bool ){
					self.store.query( 'schedule', { day: self.get( 'day' ) } ).then( function( dbDays ){
						var filtered = dbDays.filter( function( item ){
							return item.get( 'vehicle_id' ) !== null;
						} );
						if( filtered.length > 0 ){
							self.filteredVehicles( filtered ).then( function( array ){
								self.set( 'availableVehicles', array );
								self.set( 'day', day );
							} );
						}
						else{
							self.set( 'day', day );
							self.set( 'availableVehicles', self.get( 'vehicles' ) )
						}
					} )
				}
				else{
					self.set( 'availableVehicles', [] )
					console.log( "***********" )
				}
			} );
		},

		vehicleSelected: function( vehicle_id ){
			console.log( vehicle_id );
		},
		
		add: function(){
			var self = this;
			var schedule = this.store.createRecord( 'schedule', {
				firstName: this.get( 'firstName' ),
				lastName: this.get( 'lastName' )
			} );

			schedule.save().then( function(){
				self.transitionToRoute( 'dashboard.drivers' );
			} );
		}
	}
} );