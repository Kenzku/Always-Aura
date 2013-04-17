/**
 * Author: Ken
 * Date: 11/04/2013
 * Time: 10:28
 */
define(function(){
   return ComponentAPI;
});

function ComponentAPI(){
    var self = this;
    /**
     * initialise a sensor
     * @param session {Object} WAMP session
     * @param type {String} 'temperature' or 'switch'
     * @param config {{}}, a JSON object of the configuration
     * @param successCallback success callback
     * with the returned data as its parameter
     * @param errorCallback
     */
    self.initComponent =  function (session,type,config,successCallback,errorCallback) {
        var args = config && typeof config == 'object' ?
            [type,config] :
            [type];

        session.call('component:init',args).then(successCallback,errorCallback);
    }
    /**
     * reset sensor state
     * @param session {Object} WAMP session
     * @param successCallback success callback
     * with the returned data as its parameter
     */
    self.resetComponent = function (session,successCallback) {
        session.call('component:reset').then(successCallback);
    }
}