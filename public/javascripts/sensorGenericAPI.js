/**
 * Author: Ken
 * Date: 29/03/2013
 * Time: 16:03
 * Reference: http://dev.webinos.org/specifications/draft/sensors.html#::PendingSensorConfigOp
 */

var EventFireMode = {
    fixedInterval : "fixedinterval",
    valueChange : "valuechange"
}

var ReturnAble = {
    true : true,
    false : false
}

var CancelAble = {
    true : true,
    false : false
}

var EventType = {
    nothing : "nothing",
    sensor : "sensor",
    actuator : "actuator"
}

var State = {
    original : 0
}

function GeoPosition() {
    var latitude = 0.0;
    var longitude = 0.0;
    return {latitude:latitude,longitude:longitude};
}
/**
 *
 * @constructor
 */
function GenericSensor() {
    var self = this;

    self.componentType = ""; // componentType {String} e.g.
    self.deviceID = ""; // sensorId {String} sensor ID
    self.returnable = ReturnAble.true;
    self.timeout = 100.0; // in milliseconds
    self.rate = 50.0; // in milliseconds
    self.eventFireMode = EventFireMode.fixedInterval;
    self.position = new GeoPosition(); // position {Object} Position of the sensor

    /**
     * hardware properties
     * @type {null}
     */
    self.maximumRange = null;
    self.minDelay = null;
    self.power = null;
    self.resolution = null;
    self.vendor = null;
    self.version = null;

    /**
     * configuration object
     * @param options {Object}
     */
    self.configureComponent = function (options){
        for (option in options){
            switch (option) {
                case "componentType":
                    self.componentType = options[option];
                    break;
                case "deviceID":
                    self.deviceID = options[option];
                    break;
                case "returnable":
                    self.returnable = options[option];
                    break;
                case "timeout":
                    self.timeout = options[option];
                    break;
                case "rate":
                    self.rate = options[option];
                    break;
                case "eventFireMode":
                    self.eventFireMode = options[option];
                    break;
                case "position":
                    self.position = options[option];
                    break;
                case "maximumRange":
                    self.maximumRange = options[option];
                    break;
                case "minDelay":
                    self.minDelay =  options[option]
                    break;
                case "power":
                    self.power = options[option];
                    break;
                case "resolution":
                    self.resolution = options[option];
                    break;
                case "vendor":
                    self.vendor = options[option];
                    break;
                case "version":
                    self.version = options[option];
                    break;
            }
        }
    }

    self.componentEvent = function () {
        var _self = this;

        _self.type = EventType.nothing;
        _self.eventFireMode = self.eventFireMode;
        _self.position = self.position; // position {Object} Position of the sensor
        _self.returnValue = {}; // sensorValues {Object} sensor values
        _self.cancelable = CancelAble.false;
        _self.callback = null;
        _self.state = State.original;

        _self.initSensorEvent = function(options){
            for (option in options){
                switch (option) {
                    case "type":
                        _self.type = options[option];
                        break;
                    case "eventFireMode":
                        _self.eventFireMode = options[option];
                        break;
                    case "position":
                        _self.position = options[option];
                        break;
                    case "returnValue":
                        _self.returnValue = options[option];
                        break;
                    case "cancelable":
                        _self.cancelable =  options[option];
                        break;
                    case "callback":
                        _self.callback = (typeof options[option] === "function") ? options[option] : null;
                        break;
                    case "state":
                        _self.state =  options[option];
                        break;
                }
            }
        }

        _self.doAction = function () {
            switch (_self.type) {
                case "actuator":
                    _self.actuate();
                    break;
                case "sensor":
                    // return sense data
                    return _self.sense();
                    break;
                default:
                    return null;
                    break;
            }
        }
        /**
         * I am not sure this part
         * do I need callback, or do I need predefine functions?
         */
        _self.actuate = function () {
            _self.callback();
            _self.state += 1;
        }
        _self.sense = function () {
            if (_self.callback && typeof _self.callback === "function"){
                _self.callback();
            }
        }
    };
};


