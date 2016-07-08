import DS from 'ember-data';

export default DS.RESTAdapter.extend( {
	namespace: 'localhost:3000/'
} );