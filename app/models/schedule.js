import DS from 'ember-data';

export default DS.Model.extend( {
	day: DS.attr(),
	driver_id: DS.attr()
} );