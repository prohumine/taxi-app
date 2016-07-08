import DS from 'ember-data';

export default DS.Model.extend( {
	make: DS.attr(),
	model: DS.attr(),
	licensePlate: DS.attr()
} );