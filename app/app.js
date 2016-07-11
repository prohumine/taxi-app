import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import EmberValidations from 'ember-validations';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

EmberValidations.reopen( {
    init: function(){
        this._super.apply( this, arguments );
        this.validated = false;
    },
    validate: function(){
        var _this = this;
        this.set( 'validated', true );
        return new Ember.RSVP.Promise( function( resolve, reject ){
            _this._super().then( function(){
                _this.set( 'validated', false );
                resolve();
            }, function( errors ){
                Ember.run.scheduleOnce( 'afterRender', _this, function(){
                    var errorElement = Ember.$( '.has-error' ).first();
                    if( errorElement.length > 0 ){
                        var scrollableElement = errorElement.scrollParent().first();
                        if( scrollableElement.length > 0 ){
                            if( scrollableElement.prop( 'nodeName' ) === '#document' ){
                                scrollableElement.scrollTop( Math.max( 0, errorElement.offset().top - 14 ) );
                            }
                            else{
                                scrollableElement.scrollTop( Math.max( 0, scrollableElement.scrollTop() + errorElement.position().top - 14 ) );
                            }
                        }
                    }
                } );
                reject( errors );
            } );
        } );
    }
} );

export default App;
