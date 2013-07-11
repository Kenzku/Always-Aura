/**
 * Author: Ken
 * Date: 29/03/2013
 * Time: 16:03
 * Reference: http://dev.webinos.org/specifications/draft/sensors.html#::PendingSensorConfigOp
 */

var Constant = require('./Constant');

/**
 *
 * @constructor
 */
function GenericComponent() {
    "use strict";
    var self = this;

    self.componentType = Constant.ComponentSpec.type.default; // componentType {String} e.g.
    self.deviceID = Constant.ComponentSpec.default.did; // sensorId {String} sensor ID
    self.returnable = Constant.ReturnAble.true;
    self.timeout = Constant.ComponentSpec.default.timeout; // in milliseconds
    self.rate = Constant.ComponentSpec.default.rate; // in milliseconds
    self.eventFireMode = Constant.EventFireMode.fixedInterval;
    self.position = new Constant.GeoPosition(); // position {Object} Position of the sensor

    /**
     * hardware properties
     * @type {null}
     */
    self.maximumRange = Constant.ComponentSpec.default.hardware;
    self.minDelay = Constant.ComponentSpec.default.hardware;
    self.power = Constant.ComponentSpec.default.hardware;
    self.resolution = Constant.ComponentSpec.default.hardware;
    self.vendor = Constant.ComponentSpec.default.hardware;
    self.version = Constant.ComponentSpec.default.hardware;

    /**
     * configuration object
     * @param options {Object}
     */
    self.configureComponent = function (options) {
        var option;
        for (option in options) {
            if (options.hasOwnProperty(option)) {
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
                    self.minDelay =  options[option];
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
    };

    self.componentEvent = function () {
        /*jslint nomen: true*/
        var _self = this;

        _self.type = Constant.EventType.nothing; // sensor or actuator
        _self.eventFireMode = self.eventFireMode;
        _self.position = self.position; // position {Object} Position of the sensor
        // Values {Object} sensor values - This value does not make sense to put here AT THE MOMENT
        _self.returnValue = Constant.ComponentSpec.default.data;
        _self.cancelable = Constant.CancelAble.false;
        /* {{_self.callback}} if actuator, no return value, but change the state; if sensor, return a JSON */
        _self.callback = null;
        /**
         * Use for actuator, denoting the change of its state
         * @type {*}
         */
        _self.state = Constant.State.original;

        _self.initComponentEvent = function (options) {
            var option;
            for (option in options) {
                if (options.hasOwnProperty(option)) {
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
        };

        _self.doAction = function (successfulCallback, errorCallback) {
            switch (_self.type) {
            case "actuator":
                _self.actuate(successfulCallback, errorCallback);
                break;
            case "sensor":
                _self.sense(successfulCallback, errorCallback);
                break;
            default:
                return null;
            }
        };
        /**
         * I am not sure this part
         * do I need callback, or do I need predefine functions?
         */
        _self.actuate = function (successfulCallback, errorCallback) {
            _self.callback(successfulCallback, errorCallback);
            /* NEED TO PUT INTO CALLBACK, LET THE CB UPDATE THE STATE */
            _self.state += 1;
        };

        _self.sense = function (successfulCallback, errorCallback) {
            _self.callback(successfulCallback, errorCallback);
        };
        /*jslint nomen: false*/
    };
}

module.exports = GenericComponent;


