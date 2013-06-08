/**
 * Author: Ken
 * Date: 05/04/2013
 * Time: 10:14
 * NOTE: initwamp.js should have been called before hand,
 * so that the WAMP connection has been setup.
 */
/*global define*/
define(function () {
    "use strict";
    function TemperatureSensorAPI() {
        var self = this;

        /**
         * get data from a sensor
         * with the returned data as its parameter
         * @param session WAMP session
         * @param successCallback with parameter (response)
         * @param errorCallback with parameter (error)
         */
        self.getData = function (session, successCallback, errorCallback) {
            /**
             * RPC success callback
             * @param res the data that the server transfer
             */
            function successCB(res) {
                console.log(res);
                successCB.successCallback(res);
            }
            function errorCB(err) {
                console.log(err);
                errorCB.errorCallback(err);
            }
            if (successCallback && typeof successCallback === 'function') {
                successCB.successCallback = successCallback;
            }
            if (errorCallback && typeof errorCallback === 'function') {
                errorCB.errorCallback = errorCallback;
            }

            session.call('sensor:getData').then(successCB, errorCB);
        };
    }
    return TemperatureSensorAPI;
});