/**
 * Author: Ken
 * Date: 09/04/2013
 * Time: 12:46
 */
var GenericComponent = require('./GenericComponentAPI');
var Constant = require('../sensor/Constant');
var CouchDB = require('../db/CouchDB');

function LightActuator (configuration) {
    var self = this;

    self.aGenericComponent = new GenericComponent();
    self.aComponentEvent = new self.aGenericComponent.componentEvent();

    /**
     * a on/off switch, or a dial
     * @type {String}
     */
    self.switchMode = Constant.ComponentSpec.default.switchMode.onoff;
    /**
     * if it is a Boolean, it refers to on/off mode: true - on, false-off
     * if it is a Number, it refers to dial mode: 0-100,
     * where 0 is the minimal power
     * @type {Boolean} or {Number}
     */
    self.strength = Constant.ComponentSpec.default.switch.off;

    self.checkLightState = function (roomId, successCallback,errorCallback){
        if (!roomId || typeof roomId === 'function'){
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(Constant.Error.LightActuator.room);
            }else{
                throw Constant.Error.LightActuator.room;
            }
        }
        var aCouchDB = new CouchDB('room');
        aCouchDB.readDocument(Constant.room.id, successCB, errorCallback);

        // success callback to aCouchDB.readDocument
        function successCB (body){
            if (body && body.hasOwnProperty('isLightOn')){
                if(successCallback && typeof successCallback === 'function' ){
                    successCallback(body.isLightOn);
                }
            }else{
                if (errorCallback && typeof errorCallback === 'function'){
                    errorCallback(Constant.Error.CouchDB.read);
                }else{
                    throw (Constant.Error.CouchDB.read);
                }
            }
        }
    }
    /**
     * switch the light
     * @param roomId the id of the room
     * @param successCallback (newLightStatus)
     * @param errorCallback (error)
     */
    self.switchLight = function (roomId, successCallback,errorCallback){
        var aCouchDB = new CouchDB('room');
        if (!roomId || typeof roomId === 'function'){
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(Constant.Error.LightActuator.room);
            }else{
                throw Constant.Error.LightActuator.room;
            }
        }
        self.checkLightState(roomId,successCB, errorCallback);

        // success callback to aCouchDB.readDocument
        function successCB (lightStatus){
            aCouchDB.updateDocument(Constant.room.id,'isLightOn',{isLightOn:!lightStatus},null, errorCallback);
            if (successCallback && typeof successCallback === 'function'){
                // the new status: !lightStatus
                successCallback(!lightStatus);
            }
        }
    }

    /**
     * reset current sensor state
     * you might need to re-config the sensor after reset
     * by calling 'config'
     */
    self.resetState = function () {
        self.aGenericComponent = new GenericComponent();
        self.aComponentEvent = new self.aGenericComponent.componentEvent();
        self.configuration = Constant.ComponentSpec.default.config;
        self.config();
    };
    /**
     * the sensor configuration
     * @type {{}}
     */
    self.configuration = Constant.ComponentSpec.default.config;
    /**
     * should referece GenericSensorAPI
     * @type {{}}
     * @param configuration
     */
    self.config = function (configuration) {
        var options = {};
        if (configuration && typeof configuration === 'object'){
            // initialise Generic Sensor
            options = {
                componentType: Constant.ComponentSpec.type.actuator.switch,
                deviceID: configuration.deviceID || Constant.ComponentSpec.default.did,
                returnable:configuration.returnable || Constant.ReturnAble.false,
                timeout:configuration.timeout || Constant.ComponentSpec.default.timeout,
                rate:configuration.rate || Constant.ComponentSpec.default.rate,
                eventFireMode: configuration.eventFireMode || Constant.EventFireMode.valueChange,
                position:configuration.position || new Constant.GeoPosition(),
                maximumRange : configuration.maximumRange || Constant.ComponentSpec.default.hardware,
                minDelay : configuration.minDelay || Constant.ComponentSpec.default.hardware,
                power : configuration.power || Constant.ComponentSpec.default.hardware,
                resolution : configuration.resolution || Constant.ComponentSpec.default.hardware,
                vendor : configuration.vendor || Constant.ComponentSpec.default.hardware,
                version : configuration.version || Constant.ComponentSpec.default.hardware
            };
            self.aGenericComponent.configureComponent(options);

            // initialise Sensor Event
            options = {
                type : Constant.EventType.actuator,
                returnValue : Constant.ComponentSpec.default.data,
                cancelable: configuration.cancelable || Constant.CancelAble.false,
                // validation will be check in GenericSensorAPI
                callback : self.switchLight
            };
            self.aComponentEvent.initComponentEvent(options);

            // configure Light Actuator
            self.switchMode = configuration.switchMode || Constant.ComponentSpec.default.switchMode.onoff;
            self.strength = (self.switchMode == Constant.ComponentSpec.default.switchMode.onoff ) ?
                // on off mode
                ( (configuration.strength == Constant.ComponentSpec.default.switch.on || configuration.strength == Constant.ComponentSpec.default.switch.off) ?
                    configuration.strength : Constant.ComponentSpec.default.switch.off )
                // dial mode
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