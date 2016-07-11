import Ember from 'ember';

export default Ember.Controller.extend( {

	notify: Ember.inject.service( 'notify' ),

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
		var indices = [];
		var copyVehicles = Ember.A();
		return new Ember.RSVP.Promise( function( resolve ){
			self.get( 'vehicles' ).forEach( function( v ){
				copyVehicles.push( v );
			} );
			copyVehicles.forEach( function( car, i ){
				daysWithVehicleId.forEach( function( daySelected ){
					if( car.get( 'id' ) === daySelected.get( 'vehicle_id' ) ){
						indices.push( i );
					}
				} ) ;
			} );
			for( var j = indices.length -1 ; j > -1; j-- ){
				copyVehicles.removeAt( indices[ j ] );
			}
			resolve( copyVehicles );
		} );
	},

	actions: {

		goBack: function(){
			this.transitionToRoute( 'dashboard.schedules' );
			this.set( 'day', null );
			this.set( 'driver_id', null );
			this.set( 'errors', [] );
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
							self.filterVehicles( daysWithVehicleId ).then( function( filteredV ){

								self.set( 'availableVehicles', filteredV );
							} );
						}
						else{
							self.set( 'availableVehicles', self.get( 'vehicles' ) );
						}
					} );
				}
				else{
					self.get( 'notify' ).alert( 'Driver is already scheduled for ' + self.get( 'day' ) );
					self.set( 'availableVehicles', [] );
					self.set( 'day', null );
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
				self.get( 'notify' ).success( 'Schedule has been added' );
				self.send( 'refreshRoute' );
				self.transitionToRoute( 'dashboard.schedules' );
			} ).catch( function( res ){
				self.get( 'notify' ).alert( res.errors[ 0 ].message );
			} );
		}
	}
} );