/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 11:52
 */
/*global define*/
define(['jqeury',
        '../javascripts/api/lightactuatorapi.js',
        '../javascripts/initwamp.js',
        '../javascripts/api/componentapi.js',
        '../javascripts/Constant.js'], function ($, LightActuatorAPI, init, ComponentAPI, CONSTANT) {
    "use strict";
    function Room() {
        var self = this;

        self.sess = CONSTANT.WAMP.SESSION.DEFAULT;

        self.comeIn = function (successCallback, errorCallback) {
            /**
             * when successfully initialise the component
             * possible parameter: res {String} rpc callback value
             */
            function onSwitchReady() {
                if (successCallback && typeof successCallback === 'function') {
                    successCallback(self.sess);
                }
            }
            // call on WAMP connection successfully establish
            function successCB(session) {
                self.sess = session;
                self.sess.prefix("room", "http://" + CONSTANT.DOMAIN + ":" + CONSTANT.PORT +  "/room#");
                self.sess.prefix("actuator", "http://" + CONSTANT.DOMAIN + ":" + CONSTANT.PORT +  "/actuator#");

                // initComponent
                var aComponentAPI = new ComponentAPI();
                aComponentAPI.initComponent(self.sess,
                    'switch',
                    {switchMode: CONSTANT.COMPONENT_SPEC.DEFAULT.SWITCH_MODE.DIMMER},
                    onSwitchReady, errorCallback);
            }
            // call on WAMP connection failed
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
         * the room can turn on the light, because it has a switch
         * @param onSwitchedLight (topicUri, data) where the data define in /lib/handlers.js
         * @param successCallback (boolean) the status of the light, after switch
         * @param errorCallback (error) the reason of error
         */
        self.switchLight = function (onSwitchedLight, successCallback, errorCallback) {
            var aLightActuatorAPI = new LightActuatorAPI();
            /**
             * call when knows t
             * @param data {Boolean} light status after switching
             */
            function rpcSuccessCallback(data) {
                // exclude me: according to the standard
                aLightActuatorAPI.adjust(self.sess, data);
                if (successCallback && typeof successCallback === 'function') {
                    successCallback(data);
                }
            }
            aLightActuatorAPI.switchLight(self.sess, onSwitchedLight, rpcSuccessCallback, errorCallback);
        };
        // possible parameters: onSwitchedLight, successCallback, errorCallback
        self.switchUI = function () {
            $(document).on('click', '#lightSwitch', self.switchLight);
        };

        self.adjustUI = function (onAdjustLight, rpcSuccessCallback, rpcErrorCallback) {
            var aLightActuatorAPI = new LightActuatorAPI();
            /**
             * because of UI simulation only ranging from 0 to 30
             * @returns {Number} the real strength of luminance
             */
            function converter() {
                /*jslint nomen: true*/
                var _strength = $('#dimmer').val(),
                    strength = (10 * _strength) / 3;
                /*jslint nomen: false*/
                return parseInt(strength, 10);
            }
            // for efficiency, final state only; parameter: event
            $(document).on('mouseup', '#dimmer', function () {
                // set On/ofaf status on CouchDB
                aLightActuatorAPI.adjustLuminance(self.sess, converter(), rpcSuccessCallback, rpcErrorCallback);
            });
            // parameter: event
            $(document).on('change', '#dimmer', function () {
                // this will not effect CouchDB
                aLightActuatorAPI.adjust(self.sess, parseInt($('#dimmer').val(), 10));
            });
        };

    }
    return Room;
});