/**
 * Author: Ken
 * Date: 09/04/2013
 * Time: 12:46
 */
var GenericComponent = require('./GenericComponentAPI');
var Constant = require('../sensor/Constant');
var CouchDB = require('../db/CouchDB');
var Light = require('../sensor/Light');

function LightActuator(configuration) {
    "use strict";
    var self = this;

    self.aGenericComponent = new GenericComponent();
    self.aComponentEvent = new self.aGenericComponent.componentEvent();

    /**
     * a on/off switch, or a dimmer
     * @type {String}
     */
    self.switchMode = Constant.ComponentSpec.default.switchMode.onoff;
    /**
     * if it is a Boolean, it refers to on/off mode: true - on, false-off
     * if it is a Number, it refers to dimmer mode: 0-100,
     * where 0 is the minimal power
     * @type {Boolean} or {Number}
     */
    self.strength = Constant.ComponentSpec.default.switch.off;

    /**
     * switch the light
     * @param lightId {String} the id of the light
     * @param successCallback (newLightStatus)
     * @param errorCallback (error)
     */
    self.switchLight = function (lightId, successCallback, errorCallback) {
        var aCouchDB = new CouchDB('room'),
            aLight = new Light();
        if (!lightId || typeof lightId === 'function') {
            if (errorCallback && typeof errorCallback === 'function') {
                errorCallback(Constant.Error.LightActuator.room);
            } else {
                throw Constant.Error.LightActuator.room;
            }
        }
        /**
         * IMPORTANT: This function will effect the RPC API
         * that the browser connects to
         * success callback to aCouchDB.readDocument.
         * @param {Object} lightStatus: {isLightOn: Boolean, strength: Number}
         */
        function successCB_1 (lightStatus){
            aCouchDB.updateDocument(Constant.room.id,'isLightOn',{isLightOn:!lightStatus.isLightOn},
                successCB_2, errorCallback);
            function successCB_2 (body) {
                if (successCallback && typeof successCallback === 'function'){
                    // the new status: !lightStatus
                    successCallback(!lightStatus.isLightOn);
                }
            }
        }
        aLight.checkLightState(lightId, successCB_1, errorCallback);
    };
    /**
     * switch the light on, ignore its current state
     * @param lightId {String} the id of the light
     * @param successCallback (body) update success body, information about the entry
     * @param errorCallback (error)
     */
    self.switchOn = function (lightId, successCallback, errorCallback) {
        var aCouchDB = new CouchDB('room');
        if (!lightId || typeof lightId === 'function') {
            if (errorCallback && typeof errorCallback === 'function') {
                errorCallback(Constant.Error.LightActuator.room);
            } else {
                throw Constant.Error.LightActuator.room;
            }
        }
        aCouchDB.updateDocument(Constant.room.id, 'isLightOn',
            {isLightOn: Constant.ComponentSpec.default.switch.on},
            successCallback, errorCallback);
    };
    /**
     * switch the light off, ignore its current state;
     * if the light actuator support dimmer, the strength will be set to 0,
     * otherwise, strength will be ignored.
     * @param lightId {String} the id of the light
     * @param successCallback (body) update success body, information about the entry
     * @param errorCallback (error)
     */
    self.switchOff = function (lightId, successCallback, errorCallback) {
        var aCouchDB = new CouchDB('room');
        if (!lightId || typeof lightId === 'function') {
            if (errorCallback && typeof errorCallback === 'function') {
                errorCallback(Constant.Error.LightActuator.room);
            } else {
                throw Constant.Error.LightActuator.room;
            }
        }
        // check if the component support dimmer
        if (self.switchMode === 'dimmer') {
            aCouchDB.updateDocument(Constant.room.id, 'isLightOn',
                {
                    isLightOn: Constant.ComponentSpec.default.switch.off,
                    strength: Constant.ComponentSpec.default.dimmer.strength
                },
                successCallback, errorCallback);
        } else {
            aCouchDB.updateDocument(Constant.room.id, 'isLightOn',
                {isLightOn: Constant.ComponentSpec.default.switch.off},
                successCallback, errorCallback);
        }

    };

    /**
     * update luminance
     * @param lightId {String} the id of the light
     * @param strength {Number} the strength of the luminance
     * @param successCallback (body) body: update succeed body return by CouchDB
     * body example:
     * { ok: true,
     * id: '8361e3dfb52f0e28784c3cb53404477a',
     * rev: '23-fcd31d0099280925732615886ea01c39' }
     * @param errorCallback (error)
     */
    self.adjustLuminance = function (lightId, strength, successCallback, errorCallback) {
        /*jslint nomen: true*/
        var aCouchDB = new CouchDB('room'),
            _strength;
        // dimmer mode should be supported, otherwise throw error
        if (self.switchMode !== Constant.ComponentSpec.default.switchMode.dimmer) {
            if (errorCallback && typeof errorCallback === 'function') {
                errorCallback(Constant.Error.LightActuator.dimmer);
            } else {
                throw Constant.Error.LightActuator.dimmer;
            }
        }

        // the strength should be a number, otherwise throw error
        if (strength.constructor !== Number) {
            if (errorCallback && typeof errorCallback === 'function') {
                errorCallback(Constant.Error.LightActuator.strength);
            } else {
                throw Constant.Error.LightActuator.strength;
            }
        }

        // strength should be in the valid range otherwise throw error
        if (strength < 0 || strength > 100) {
            if (errorCallback && typeof errorCallback === 'function') {
                errorCallback(Constant.Error.Light.strength);
            } else {
                throw Constant.Error.Light.strength;
            }
            return;
        }
        /* ---- HASN'T TESTED YET  ----*/
        // if the strength is 0, update the light to off; otherwise on
        _strength = parseInt(strength, 10);
        if (_strength === 0) {
            aCouchDB.updateDocument(Constant.room.id, null, {isLightOn: false, strength: _strength}, successCallback, errorCallback);
        } else {
            aCouchDB.updateDocument(Constant.room.id, null, {isLightOn: true, strength: _strength}, successCallback, errorCallback);
        }
    };

    /**
     * reset current actuator state
     * you might need to re-config the actuator after reset
     * by calling 'config'
     */
    self.resetState = function () {
        self.aGenericComponent = new GenericComponent();
        self.aComponentEvent = new self.aGenericComponent.componentEvent();
        self.configuration = Constant.ComponentSpec.default.config;
        self.config();
    };
    /**
     * the actuator configuration
     * @type {{}}
     */
    self.configuration = Constant.ComponentSpec.default.config;
    /**
     * should referece GenericComponentAPI
     * @type {{}}
     * @param configuration
     */
    self.config = function (configuration) {
        var options = {};
        if (configuration && typeof configuration === 'object'){
            // initialise Generic actuator
            options = {
                componentType: Constant.ComponentSpec.type.actuator.switch,
                deviceID: configuration.deviceID || Constant.ComponentSpec.default.did,
                returnable: configuration.returnable || Constant.ReturnAble.false,
                timeout: configuration.timeout || Constant.ComponentSpec.default.timeout,
                rate: configuration.rate || Constant.ComponentSpec.default.rate,
                eventFireMode: configuration.eventFireMode || Constant.EventFireMode.valueChange,
                position: configuration.position || new Constant.GeoPosition(),
                maximumRange : configuration.maximumRange || Constant.ComponentSpec.default.hardware,
                minDelay : configuration.minDelay || Constant.ComponentSpec.default.hardware,
                power : configuration.power || Constant.ComponentSpec.default.hardware,
                resolution : configuration.resolution || Constant.ComponentSpec.default.hardware,
                vendor : configuration.vendor || Constant.ComponentSpec.default.hardware,
                version : configuration.version || Constant.ComponentSpec.default.hardware
            };
            self.aGenericComponent.configureComponent(options);

            // initialise actuator Event
            options = {
                type : Constant.EventType.actuator,
                returnValue : Constant.ComponentSpec.default.data,
                cancelable: configuration.cancelable || Constant.CancelAble.false,
                // validation will be check in GenericComponentAPI
                callback : self.switchLight
            };
            self.aComponentEvent.initComponentEvent(options);

            // configure Light Actuator
            self.switchMode = configuration.switchMode || Constant.ComponentSpec.default.switchMode.onoff;
            self.strength = (self.switchMode === Constant.ComponentSpec.default.switchMode.onoff) ?
                // on off mode
                ( (configuration.strength === Constant.ComponentSpec.default.switch.on || configuration.strength === Constant.ComponentSpec.default.switch.off) ?
                    configuration.strength : Constant.ComponentSpec.default.switch.off )
                // dimmer mode
                : ( (configuration.strength >= 0 && configuration.strength<=100) ?
                    configuration.strength / 100 : (configuration.strength % 100) / 100 );
        }else{
            options = {
                componentType: Constant.ComponentSpec.type.actuator.switch,
                type : Constant.EventType.actuator,
                callback : self.switchLight
            };
            // configure upper level
            self.aGenericComponent.configureComponent(options);
            self.aComponentEvent.initComponentEvent(options);
            // configure its own property
            self.switchMode = Constant.ComponentSpec.default.switchMode.onoff;
            self.strength = Constant.ComponentSpec.default.switch.off;
        }
        // set configuration
        self.configuration = {
            componentType: self.aGenericComponent.componentType,
            deviceID: self.aGenericComponent.deviceID,
            returnable: self.aGenericComponent.returnable,
            timeout: self.aGenericComponent.timeout,
            rate: self.aGenericComponent.rate,
            eventFireMode: self.aGenericComponent.eventFireMode,
            position: self.aGenericComponent.position,
            maximumRange : self.aGenericComponent.maximumRange,
            minDelay : self.aGenericComponent.minDelay,
            power : self.aGenericComponent.power,
            resolution : self.aGenericComponent.resolution,
            vendor : self.aGenericComponent.vendor,
            version : self.aGenericComponent.version,

            type : self.aComponentEvent.type,
            cancelable: self.aComponentEvent.cancelable,

            switchMode : self.switchMode,
            strength : self.strength
        }
    };

    (self.init = function () {
        self.config(configuration);
    })();
}
module.exports = LightActuator;

