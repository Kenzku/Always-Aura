/**
 * Author: Ken
 * Date: 05/04/2013
 * Time: 10:14
 * NOTE: initwamp.js should have been called before hand,
 * so that the WAMP connection has been setup.
 */
/**
 * initialise a sensor
 * @param type {String} either 'sensor' or 'actuator'
 * @param config {{}}, a JSON object of the configuration
 * @param callback success callback
 * with the returned data as its parameter
 */
function initSensor(type,config,callback) {
    var args = config && typeof config == 'object' ?
        [type,config] :
        [type];

    if (callback && typeof callback === 'function'){
        successCB.callback = callback;
    }
    sess.call('sensor:init',args).then(successCB);

    /**
     * RPC success callback
     * @param res the data that the server transfer
     */
    function successCB (res){
        successCB.callback(res);
    }
}
/**
 * reset sensor state
 * @param callback success callback
 * with the returned data as its parameter
 */
function resetSensor(callback) {
    if (callback && typeof callback === 'function'){
        successCB.callback = callback;
    }
    sess.call('sensor:reset').then(successCB);

    /**
     * RPC success callback
     * @param res the data that the server transfer
     */
    function successCB (res){
        successCB.callback(res);
    }
}
/**
 * get data from a sensor
 * @param callback success callback
 * with the returned data as its parameter
 */
function getData(successfulCallback,errorCallback) {
    if (successfulCallback && typeof successfulCallback === 'function'){
        successCB.successfulCallback = successfulCallback;
    }
    if (errorCallback && typeof errorCallback === 'function'){
        errorCB.errorCallback = errorCallback;
    }

    sess.call('sensor:getData').then(successCB,errorCB);

    /**
     * RPC success callback
     * @param res the data that the server transfer
     */
    function successCB (res){
        console.log(res);
        successCB.successfulCallback(res);
    }
    function errorCB (err) {
        console.log(err);
        errorCB.errorCallback(err);
    }
}

