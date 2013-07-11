/**
 * Author: Ken
 * Date: 02/04/2013
 * Time: 14:16
 */
/*global suite, test*/
var assert = require("assert"),
    expect = require('chai').expect,
    GenericComponent = require('../sensor/GenericComponentAPI'),
    Constant = require('../sensor/Constant');

suite("Generic Sensor");

test("GenericComponent - properties", function () {
    "use strict";
    var aGenericComponent = new GenericComponent();

    assert.equal(aGenericComponent.componentType, "");
    assert.equal(aGenericComponent.deviceID, "");
    assert.equal(aGenericComponent.returnable, true);
    assert.equal(aGenericComponent.timeout, 100.0);
    assert.equal(aGenericComponent.rate, 50.0);
    assert.equal(aGenericComponent.eventFireMode, "fixedinterval");
    assert.deepEqual(aGenericComponent.position, {latitude: 0.0, longitude: 0.0});
});
test("GenericComponent - hardware properties", function () {
    "use strict";
    var aGenericComponent = new GenericComponent();

    assert.deepEqual(aGenericComponent.maximumRange, null);
    assert.deepEqual(aGenericComponent.minDelay, null);
    assert.deepEqual(aGenericComponent.power, null);
    assert.deepEqual(aGenericComponent.resolution, null);
    assert.deepEqual(aGenericComponent.vendor, null);
    assert.deepEqual(aGenericComponent.version, null);
});

function initialiseHWProperty(aGenericComponent) {
    "use strict";
    var options = {
        maximumRange: 10,
        minDelay: 40.0
    };
    aGenericComponent.configureComponent(options);

    assert.deepEqual(aGenericComponent.maximumRange, 10);
    assert.deepEqual(aGenericComponent.minDelay, 40);
    assert.deepEqual(aGenericComponent.power, null);
    assert.deepEqual(aGenericComponent.resolution, null);
    assert.deepEqual(aGenericComponent.vendor, null);
    assert.deepEqual(aGenericComponent.version, null);

    options = {
        power: 30.1,
        resolution: 55.00
    };
    aGenericComponent.configureComponent(options);

    assert.deepEqual(aGenericComponent.maximumRange, 10);
    assert.deepEqual(aGenericComponent.minDelay, 40);
    assert.deepEqual(aGenericComponent.power, 30.1);
    assert.deepEqual(aGenericComponent.resolution, 55.00);
    assert.deepEqual(aGenericComponent.vendor, null);
    assert.deepEqual(aGenericComponent.version, null);

    options = {
        maximumRange : null,
        power: null,
        vendor: "Huawei",
        version: 1.0
    };
    aGenericComponent.configureComponent(options);

    assert.deepEqual(aGenericComponent.maximumRange, null);
    assert.deepEqual(aGenericComponent.minDelay, 40);
    assert.deepEqual(aGenericComponent.power, null);
    assert.deepEqual(aGenericComponent.resolution, 55.00);
    assert.deepEqual(aGenericComponent.vendor, "Huawei");
    assert.deepEqual(aGenericComponent.version, 1.0);
}

test("GenericComponent - hardware properties initialisation", function () {
    "use strict";
    var aGenericComponent = new GenericComponent();

    initialiseHWProperty(aGenericComponent);
});

test("GenericComponent - property initialisation", function () {
    "use strict";
    var aGenericComponent = new GenericComponent(),
        options = {
            componentType: "Temperature",
            deviceID: "12314213432432423154235",
            returnable: Constant.ReturnAble.false,
            timeout: 200.0,
            rate: 20.0,
            eventFireMode: Constant.EventFireMode.valueChange,
            position: {latitude: 20.123412, longitude: 81.9023213}
        };
    aGenericComponent.configureComponent(options);

    assert.equal(aGenericComponent.componentType, "Temperature");
    assert.equal(aGenericComponent.deviceID, "12314213432432423154235");
    assert.equal(aGenericComponent.returnable, false);
    assert.equal(aGenericComponent.timeout, 200.0);
    assert.equal(aGenericComponent.rate, 20.0);
    assert.equal(aGenericComponent.eventFireMode, "valuechange");
    assert.deepEqual(aGenericComponent.position, {latitude: 20.123412, longitude: 81.9023213});
});

test("GenericComponent - property mixture", function () {
    "use strict";
    var aGenericComponent = new GenericComponent(),
        options = {
            componentType: "Temperature",
            deviceID: "12314213432432423154235",
            returnable: Constant.ReturnAble.false,
            timeout: 200.0,
            rate: 20.0,
            eventFireMode: Constant.EventFireMode.valueChange,
            position: {latitude: 20.123412, longitude: 81.9023213}
        };
    aGenericComponent.configureComponent(options);

    assert.equal(aGenericComponent.componentType, "Temperature");
    assert.equal(aGenericComponent.deviceID, "12314213432432423154235");
    assert.equal(aGenericComponent.returnable, false);
    assert.equal(aGenericComponent.timeout, 200.0);
    assert.equal(aGenericComponent.rate, 20.0);
    assert.equal(aGenericComponent.eventFireMode, "valuechange");
    assert.deepEqual(aGenericComponent.position, {latitude: 20.123412, longitude: 81.9023213});

    assert.deepEqual(aGenericComponent.maximumRange, null);
    assert.deepEqual(aGenericComponent.minDelay, null);
    assert.deepEqual(aGenericComponent.power, null);
    assert.deepEqual(aGenericComponent.resolution, null);
    assert.deepEqual(aGenericComponent.vendor, null);
    assert.deepEqual(aGenericComponent.version, null);

    initialiseHWProperty(aGenericComponent);
});

suite("Generic Sensor Event");
test("GenericComponent.componentEvent - property", function () {
    "use strict";
    var aGenericComponent = new GenericComponent(),
        aComponentEvent = new aGenericComponent.componentEvent();

    assert.equal(aComponentEvent.type, Constant.EventType.nothing);
    assert.equal(aComponentEvent.type, "nothing");
    assert.equal(aComponentEvent.eventFireMode, aGenericComponent.eventFireMode);
    assert.deepEqual(aComponentEvent.position, aGenericComponent.position);
    assert.deepEqual(aComponentEvent.returnValue, Constant.ComponentSpec.default.data);
    assert.deepEqual(aComponentEvent.returnValue, null);
    assert.equal(aComponentEvent.cancelable, Constant.CancelAble.false);
    assert.deepEqual(aComponentEvent.callback, null);
});

test("GenericComponent.componentEvent - property initialise", function () {
    "use strict";
    var aGenericComponent = new GenericComponent(),
        aComponentEvent = new aGenericComponent.componentEvent(),
        options = {
            type : Constant.EventType.actuator,
            eventFireMode : Constant.EventFireMode.valueChange,
            returnValue : {temperature: 10.11}
        };

    aComponentEvent.initComponentEvent(options);
    assert.equal(aComponentEvent.type, Constant.EventType.actuator);
    assert.equal(aComponentEvent.type, "actuator");
    assert.equal(aComponentEvent.eventFireMode, Constant.EventFireMode.valueChange);
    assert.equal(aComponentEvent.eventFireMode, "valuechange");
    assert.deepEqual(aComponentEvent.position, aGenericComponent.position);
    assert.deepEqual(aComponentEvent.returnValue, {temperature: 10.11});
    assert.equal(aComponentEvent.cancelable, Constant.CancelAble.false);
    assert.deepEqual(aComponentEvent.callback, null);

    options = {
        eventFireMode : Constant.EventFireMode.fixedInterval,
        position : {latitude: 82.34324, longitude: 70.23413}
    };
    aComponentEvent.initComponentEvent(options);
    assert.equal(aComponentEvent.type, Constant.EventType.actuator);
    assert.equal(aComponentEvent.type, "actuator");
    assert.equal(aComponentEvent.eventFireMode, Constant.EventFireMode.fixedInterval);
    assert.equal(aComponentEvent.eventFireMode, "fixedinterval");
    assert.deepEqual(aComponentEvent.position, {latitude: 82.34324, longitude: 70.23413});
    assert.deepEqual(aComponentEvent.returnValue, {temperature: 10.11});
    assert.equal(aComponentEvent.cancelable, Constant.CancelAble.false);
    assert.deepEqual(aComponentEvent.callback, null);

    options = {
        type : Constant.EventType.sensor,
        cancelable : Constant.CancelAble.true
    };
    aComponentEvent.initComponentEvent(options);
    assert.equal(aComponentEvent.type, Constant.EventType.sensor);
    assert.equal(aComponentEvent.type, "sensor");
    assert.equal(aComponentEvent.eventFireMode, Constant.EventFireMode.fixedInterval);
    assert.equal(aComponentEvent.eventFireMode, "fixedinterval");
    assert.deepEqual(aComponentEvent.position, {latitude: 82.34324, longitude: 70.23413});
    assert.deepEqual(aComponentEvent.returnValue, {temperature: 10.11});
    assert.equal(aComponentEvent.cancelable, Constant.CancelAble.true);
    assert.deepEqual(aComponentEvent.callback, null);

    options = {
        type : Constant.EventType.sensor,
        cancelable : Constant.CancelAble.true,
        callback : "this will not work"
    };
    aComponentEvent.initComponentEvent(options);
    assert.equal(aComponentEvent.type, Constant.EventType.sensor);
    assert.equal(aComponentEvent.type, "sensor");
    assert.equal(aComponentEvent.eventFireMode, Constant.EventFireMode.fixedInterval);
    assert.equal(aComponentEvent.eventFireMode, "fixedinterval");
    assert.deepEqual(aComponentEvent.position, {latitude: 82.34324, longitude: 70.23413});
    assert.deepEqual(aComponentEvent.returnValue, {temperature: 10.11});
    assert.equal(aComponentEvent.cancelable, Constant.CancelAble.true);
    assert.deepEqual(aComponentEvent.callback, null);
});

test("GenericComponent.componentEvent - event action - nothing", function () {
    "use strict";
    var aGenericComponent = new GenericComponent(),
        aComponentEvent = new aGenericComponent.componentEvent(),
        options = {
            callback : "this will not work"
        },
        previousState = aComponentEvent.state;;
    assert.deepEqual(aComponentEvent.callback, null);
    assert.deepEqual(aComponentEvent.doAction(), null);

    aComponentEvent.initComponentEvent(options);
    assert.deepEqual(aComponentEvent.callback, null);
    assert.deepEqual(aComponentEvent.doAction(), null);

    options = {
        type : Constant.EventType.actuator,
        callback : function () { aComponentEvent.state += 1; }
    };

    aComponentEvent.initComponentEvent(options);
    assert.equal(aComponentEvent.type, Constant.EventType.actuator);
    assert.deepEqual(typeof aComponentEvent.callback, 'function');

    aComponentEvent.doAction(); // this function will add one state
    assert.equal(aComponentEvent.state, previousState + 2);
});

test("GenericComponent.componentEvent - event action - actuator state changed", function () {
    "use strict";
    var aGenericComponent = new GenericComponent(),
        aComponentEvent = new aGenericComponent.componentEvent(),
        options = {
            type : Constant.EventType.actuator,
            callback : function () { aComponentEvent.state += 1; }
        },
        previousState = aComponentEvent.state;
    assert.deepEqual(aComponentEvent.callback, null);
    assert.deepEqual(aComponentEvent.doAction(), null);

    aComponentEvent.initComponentEvent(options);
    assert.equal(aComponentEvent.type, Constant.EventType.actuator);
    assert.deepEqual(typeof aComponentEvent.callback, 'function');

    aComponentEvent.doAction(); // this function will add one state
    assert.equal(aComponentEvent.state, previousState + 2);

    options = {
        type : Constant.EventType.actuator,
        callback : function () { aComponentEvent.state = Constant.State.original; }
    };

    aComponentEvent.initComponentEvent(options);
    aComponentEvent.doAction(); // this function will add one state
    assert.equal(aComponentEvent.state, 1);

    options = {
        type : Constant.EventType.nothing,
        callback : function () { return null; },
        state : 0
    };

    aComponentEvent.initComponentEvent(options);
    assert.deepEqual(typeof aComponentEvent.callback, 'function');
    assert.equal(aComponentEvent.state, 0);
});

test("GenericComponent.componentEvent - event action - sensor value 1", function() {
    "use strict";
    var aGenericComponent = new GenericComponent(),
        aComponentEvent = new aGenericComponent.componentEvent(),
        options = {
            type : Constant.EventType.sensor,
            callback : function (successCB) {
                successCB({c0: 13, c1: false, c2: "6"});
            }
        };
    assert.deepEqual(aComponentEvent.callback, null);
    assert.deepEqual(aComponentEvent.doAction(), null);

    function successCB(data) {
        assert.deepEqual(data, {c0: 13, c1: false, c2: "6"});
    }

    aComponentEvent.initComponentEvent(options);
    aComponentEvent.doAction(successCB);
});
test("GenericComponent.componentEvent - event action - sensor value 2", function () {
    "use strict";
    var aGenericComponent = new GenericComponent(),
        aComponentEvent = new aGenericComponent.componentEvent(),
        options = {
            type : Constant.EventType.sensor,
            callback : function (successCB) { successCB({}); }
        };

    function successCB(data) {
        assert.deepEqual(data, {});
    }

    aComponentEvent.initComponentEvent(options);
    aComponentEvent.doAction(successCB);
});