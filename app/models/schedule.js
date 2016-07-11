import DS from 'ember-data';

export default DS.Model.extend( {
	day: DS.attr(),
	driver_id: DS.attr(),
	vehicle_id: DS.attr(),
	driver: DS.attr(),
	vehicle: DS.attr()
} );