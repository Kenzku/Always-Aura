/**
 * Author: Ken
 * Date: 11/04/2013
 * Time: 17:49
 */
/*global define*/
define(['jqeury',
        '../javascripts/api/lightactuatorapi.js',
        '../javascripts/initwamp.js',
        '../javascripts/Constant.js'], function ($, LightActuatorAPI, init, CONSTANT) {
    "use strict";
    function Light() {
        var self = this;

        self.sess = null;

        self.currentLightStatus = null;
        /**
         * establish a WAMP connection with the server, and subscribe the default
         * topic: "room:lightStatus"
         * @param onLightStatusChange (topic, event) called a WAMP event comes - typeID : 8
         * This type is for publish/subscribe mode and it means that one client,
         * who subscribe the same channel has published a message. In this case,
         * the client should be the room, who has the switch.
         * the data structure is {'turnLightTo': data}
         * @param onSunStatusChange (strength)
         * @param successCallback (session) called when init is successfully done
         * @param errorCallback (error) called when an error happen
         */
        self.init = function (onLightStatusChange, onSunStatusChange, successCallback, errorCallback) {
            // call on WAMP connection successfully establish
            function successCB(session) {
                self.sess = session;
                self.sess.prefix("room", "http://" + CONSTANT.DOMAIN + ":" + CONSTANT.PORT +  "/room#");
                self.sess.prefix("sun", "http://" + CONSTANT.DOMAIN + ":" + CONSTANT.PORT +  "/sun#");

                self.sess.subscribe(CONSTANT.WAMP.TOPIC.LIGHT_STATUS, onLightStatusChange);
//            self.senseSun(onSunStatusChange);

                if (successCallback && typeof successCallback === 'function') {
                    successCallback(session);
                }
            }
            // call on WAMP connection failed on establish
            function errorCB(error) {
                if (errorCallback && typeof errorCallback === 'function') {
                    errorCallback(error);
                } else {
                    throw error;
                }
            }
            // init WAMP connection
            init(successCB, errorCB);
        };
        /**
         * check the current light status
         * @param rpcSuccessCallback (Object : currentLightStatus) light status before switching,
         * it is the current light status {isLightOn:Boolean, strength: Number}
         * @param rpcErrorCallback (error) the reason of error
         */
        self.lightStatus = function (rpcSuccessCallback, rpcErrorCallback) {
            var aLightActuatorAPI = new LightActuatorAPI();
            if (self.sess) {
                aLightActuatorAPI.lightStatus(self.sess, rpcSuccessCallback, rpcErrorCallback);
            } else {
                if (rpcErrorCallback && typeof rpcErrorCallback === 'function') {
                    rpcErrorCallback(CONSTANT.ERROR.LIGHT.LIGHT_STATUS);
                } else {
                    throw CONSTANT.ERROR.LIGHT.LIGHT_STATUS;
                }
            }
        };
        /**
         * newStatus {Boolean} isLightOn | {Number} strength
         */
        self.updateLightUI = function (newStatus) {
            var body = $('body');
            function onOffMode(newStatus) {
                body.removeAttr('style');
                if (newStatus) {
                    body.attr('class', 'lightOn');
                    $('p').attr('class', 'textLightOn');
                } else {
                    body.attr('class', 'lightOff');
                    $('p').attr('class', 'textLightOff');
                }
            }

            function dimmer(newStatus) {
                if (newStatus > 1) {
                    var colour = "radial-gradient(circle at center, rgb(251, 255, 58) " + newStatus + "%, rgb(254, 255, 209) " + newStatus * 2 + "%)";
                    body.attr('class', 'lightOn');
                    $('p').attr('class', 'textLightOn');
                    $('.lightOn').css('background-image', colour);
                } else {
                    body.removeAttr('style');
                    body.attr('class', 'lightOff');
                    $('p').attr('class', 'textLightOff');
                }
            }
            switch (typeof newStatus) {
            case 'boolean':
                onOffMode(newStatus);
                break;
            case 'number':
                dimmer(newStatus);
                break;
            }
        };

        self.doNotSenseSun = function () {
            self.sess.unsubscribe(CONSTANT.WAMP.TOPIC.SUN);
        };

        self.senseSun = function (onSunStatusChange) {
            self.sess.subscribe(CONSTANT.WAMP.TOPIC.SUN, onSunStatusChange);
        };
    }
    return Light;
});