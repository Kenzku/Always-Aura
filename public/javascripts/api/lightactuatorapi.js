/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 14:52
 */
define(function(){
    return LightActuatorAPI;
});

function LightActuatorAPI () {
    var self = this;

    self.switchLight = function (session,onSwitchedLight,successCallback,errorCallback) {
        if (successCallback && typeof successCallback === 'function'){
            successCB.successCallback = successCallback;
        }
        if (errorCallback && typeof errorCallback === 'function'){
            errorCB.errorCallback = errorCallback;
        }

        session.call('actuator:switchLight').then(successCB,errorCB);
        if (onSwitchedLight && typeof onSwitchedLight === 'function'){
            session.subscribe("room:light", onSwitchedLight);
        }
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
}

