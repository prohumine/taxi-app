import Ember from 'ember';

export default Ember.Route.extend( {
  
  renderTemplate: function(){
    this.render( 'dasboard/vehicles/edit', {
      outlet: 'shared',
      into: 'dashboard'
    } );
  }
} );