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

    self.switchLight = function (session,onSwitchedLight,rpcSuccessCallback,rpcErrorCallback) {
        session.call('actuator:switchLight').then(rpcSuccessCallback,rpcErrorCallback);

        if (onSwitchedLight && typeof onSwitchedLight === 'function'){
            session.subscribe("room:lightStatus", onSwitchedLight);
        }
    }
}

