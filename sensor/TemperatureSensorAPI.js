/**
 * Author: Ken
 * Date: 04/04/2013
 * Time: 12:02
 */
var GenericComponent = require('./GenericComponentAPI');
var Constant = require('../sensor/Constant');
var CouchDB = require('../db/CouchDB');

function TemperatureSensor(configuration) {
    var self = this;

    self.aGenericComponent = new GenericComponent();
    self.aComponentEvent = new self.aGenericComponent.componentEvent();
    /**
     * temperature return by sensor
     * @type {number}
     */
    self.temperature = Constant.ComponentSpec.default.data;

    /**
     * Tell the sensor what to do.
     * This might be an asynchronous callback function
     * when configure the sensor,
     * this function will be automatically inject into
     * Generic Sensor API
     * @return {{}}
     */
    self.updateTemperatureOnSensor = function (successfulCallback, errorCallback) {
        /* Need To Do - currently testing on one sample data */
        var aCouchDB = new CouchDB('saku_snabb');
        aCouchDB.readDocument(self.aGenericComponent.deviceID,
            // success CB
            function (body) {
                if (successfulCallback && typeof successfulCallback === 'function') {
                    var data;
                    if (!body.data) {
                        data = Constant.ComponentSpec.default.data;
                    } else {
                        data = body.data.c0 ? { c0: body.data.c0 } : Constant.ComponentSpec.default.data;
                    }
                    self.aComponentEvent.returnValue = data;
                    self.temperature = self.aComponentEvent.returnValue;
                    successfulCallback(data);
                }
            },
            // error CB
            function (err) {
                if (errorCallback && typeof errorCallback === 'function') {
                    errorCallback(err);
                }
            });
    };
    /**
     * Ask the sensor to do an Action
     * This might be an asynchronous function
     * @return {number}
     */
    self.currentTemperature = function (successfulCallback, errorCallback) {
        self.aComponentEvent.doAction(successfulCallback, errorCallback);
    };
    /**
     * reset current sensor state
     * you might need to re-config the sensor after reset
     * by calling 'config'
     */
    self.resetState = function () {
        self.aGenericComponent = new GenericComponent();
        self.aComponentEvent = new self.aGenericComponent.componentEvent();
        self.temperature = Constant.ComponentSpec.default.data;
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
                componentType: Constant.ComponentSpec.type.sensor.temperature,
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

            // initialise Sensor Event
            options = {
                type : configuration.type || Constant.EventType.sensor,
                returnValue : self.temperature,
                cancelable: configuration.cancelable || Constant.CancelAble.false,
                // validation will be check in GenericSensorAPI
                callback : self.updateTemperatureOnSensor
            };
            self.aComponentEvent.initComponentEvent(options);
        } else {
            options = {
                componentType: Constant.ComponentSpec.type.sensor.temperature,
                type : Constant.EventType.sensor,
                callback : self.updateTemperatureOnSensor
            };
            self.aGenericComponent.configureComponent(options);
            self.aComponentEvent.initComponentEvent(options);
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
            cancelable: self.aComponentEvent.cancelable
        };
    };
    /**
     * return temperature data
     * but if 'isInit' true, returns default configuration when initialise an object
     * @param isInit {boolean}
     * @param successfulCallback {function} called when get data successfully
     * @returns {{}} if isInit is true, otherwise return true.
     */
    self.getData = function (isInit, successfulCallback) {
        if (isInit) {
            return self.configuration;
        }
        // this is for 'unexpected else after return'
        if (successfulCallback && typeof successfulCallback === 'function') {
            successfulCallback({data: self.temperature});
        }
        return true;
    };

    (self.init = function () {
        self.config(configuration);
    }).call(); // `call` is for avoiding `bad invocation`
}

module.exports = TemperatureSensor;