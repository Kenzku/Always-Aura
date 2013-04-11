/**
 * Author: Ken
 * Date: 05/04/2013
 * Time: 10:14
 * NOTE: initwamp.js should have been called before hand,
 * so that the WAMP connection has been setup.
 */

/**
 * get data from a sensor
 * @param callback success callback
 * with the returned data as its parameter
 */
function getData(session,successCallback,errorCallback) {
    if (successCallback && typeof successCallback === 'function'){
        successCB.successCallback = successCallback;
    }
    if (errorCallback && typeof errorCallback === 'function'){
        errorCB.errorCallback = errorCallback;
    }

    session.call('sensor:getData').then(successCB,errorCB);

    /**
     * RPC success callback
     * @param res the data that the server transfer
     */
    function successCB (res){
        console.log(res);
        successCB.successCallback(res);
    }
    function errorCB (err) {
        console.log(err);
        errorCB.errorCallback(err);
    }
}

