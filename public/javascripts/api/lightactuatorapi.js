/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 14:52
 */
define(function(){
    return LightActuatorAPI;
});
/**
 * Interfaces that connect to WAMP server
 * @constructor
 */
function LightActuatorAPI () {
    var self = this;

    /**
     * switch the light from on to off, or off to on
     * @param session {Object} WAMP session
     * @param onSwitchedLight (event) published by others who subscribe 'room:lightStatus'
     * @param rpcSuccessCallback (newLightStatus) light status after switching
     * @param rpcErrorCallback (error) the reason of error
     */
    self.switchLight = function (session,onSwitchedLight,rpcSuccessCallback,rpcErrorCallback) {
        session.call('actuator:switchLight').then(rpcSuccessCallback,rpcErrorCallback);

        if (onSwitchedLight && typeof onSwitchedLight === 'function'){
            session.subscribe("room:lightStatus", onSwitchedLight);
        }
    }
    /**
     * check light status
     * @param session session {Object} WAMP session
     * @param rpcSuccessCallback (currentLightStatus) light status before switching,
     * it is the current light status
     * @param rpcErrorCallback (error) the reason of error
     */
    self.lightStatus = function (session, rpcSuccessCallback, rpcErrorCallback){
        session.call('room:LightStatus').then(rpcSuccessCallback,rpcErrorCallback);
    }
    /**
     * adjust luminance
     * @param session {Object} WAMP session
     * @param strength {Number}
     * @param rpcSuccessCallback (body) the update succeed body check under layer API: adjustLuminance
     * @param rpcErrorCallback (err)
     * example err:
     * Object {uri: "http://autobahn.tavendo.de/error#generic", desc: "does not support dimmer"}
     */
    self.adjustLuminance = function (session, strength, rpcSuccessCallback, rpcErrorCallback) {
        session.call('room:adjustLuminance',strength).then(rpcSuccessCallback,rpcErrorCallback);
    }

    /**
     * switch the light on, ignore its current state
     * @param session {Object} WAMP session
     * @param rpcSuccessCallback (body) the update succeed body,
     * containing the updated entry id
     * @param rpcErrorCallback (err)
     */
    self.switchOn = function (session, rpcSuccessCallback, rpcErrorCallback){
        session.call('actuator:switchOn').then(rpcSuccessCallback, rpcErrorCallback);
    }

    /**
     * switch the light off, ignore its current state;
     * if the light actuator support dimmer, the strength will be set to 0,
     * otherwise, strength will be ignored.
     * @param session {Object} WAMP session
     * @param rpcSuccessCallback (body) the update succeed body,
     * containing the updated entry id
     * @param rpcErrorCallback (err)
     */
    self.switchOff = function (session, rpcSuccessCallback, rpcErrorCallback){
        session.call('actuator:switchOff').then(rpcSuccessCallback, rpcErrorCallback);
    }
}

