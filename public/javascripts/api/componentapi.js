/**
 * Author: Ken
 * Date: 11/04/2013
 * Time: 10:28
 */
define(function(){
   return
});

function ComponentAPI(){
    var self = this;
    /**
     * initialise a sensor
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

        if (successCallback && typeof successCallback === 'function'){
            successCB.callback = successCallback;
        }
        if (errorCallback && typeof errorCallback === 'function'){
            errorCB.callback = errorCallback;
        }
        session.call('component:init',args).then(successCB,errorCB);

        /**
         * RPC success callback
         * @param res the data that the server transfer
         */
        function successCB (res){
            successCB.callback(res);
        }
        function errorCB (err){
            errorCB.callback(err);
        }
    }
    /**
     * reset sensor state
     * @param callback success callback
     * with the returned data as its parameter
     */
    self.resetComponent = function (session,callback) {
        if (callback && typeof callback === 'function'){
            successCB.callback = callback;
        }
        session.call('component:reset').then(successCB);

        /**
         * RPC success callback
         * @param res the data that the server transfer
         */
        function successCB (res){
            successCB.callback(res);
        }
    }
}