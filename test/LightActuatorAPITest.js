/**
 * Author: Ken
 * Date: 09/04/2013
 * Time: 14:39
 */
var assert = require("assert");
var expect = require('chai').expect;
var LightActuator = require('../sensor/LightActuatorAPI');
var GenericComponent = require('../sensor/GenericComponentAPI');
var Constant = require('../sensor/Constant');

function ok(expr, msg) {
    if (!expr) throw new Error(msg);
}

suite("Light Actuator");

test("properties - without configuration", function() {
    var aLightActuator = new LightActuator();
    var aGenericComponent = new GenericComponent();

    /* default property */
    assert.ok(aLightActuator.aGenericComponent instanceof GenericComponent);
    assert.ok(aLightActuator.aComponentEvent instanceof aLightActuator.aGenericComponent.componentEvent);
    assert.deepEqual(aLightActuator.switchMode, Constant.ComponentSpec.default.switchMode.onoff);
    assert.deepEqual(aLightActuator.switchMode, 'onoff');
    assert.deepEqual(aLightActuator.strength,Constant.ComponentSpec.default.switch.off);
    assert.deepEqual(aLightActuator.strength,false);

    /* default configuration */
    assert.equal(aLightActuator.aGenericComponent.componentType, Constant.ComponentSpec.type.actuator.switch);
    assert.equal(aLightActuator.aGenericComponent.componentType, "switch");
    assert.equal(aLightActuator.aGenericComponent.deviceID,"");
    assert.equal(aLightActuator.aGenericComponent.returnable,true);
    assert.equal(aLightActuator.aGenericComponent.timeout,100.0);
    assert.equal(aLightActuator.aGenericComponent.rate, 50.0);
    assert.equal(aLightActuator.aGenericComponent.eventFireMode,"fixedinterval");
    assert.deepEqual(aLightActuator.aGenericComponent.position,{latitude:0.0,longitude:0.0});

    assert.deepEqual(aLightActuator.aGenericComponent.maximumRange, null);
    assert.deepEqual(aLightActuator.aGenericComponent.minDelay, null);
    assert.deepEqual(aLightActuator.aGenericComponent.power, null);
    assert.deepEqual(aLightActuator.aGenericComponent.resolution, null);
    assert.deepEqual(aLightActuator.aGenericComponent.vendor, null);
    assert.deepEqual(aLightActuator.aGenericComponent.version,null);

    assert.equal(aLightActuator.aComponentEvent.type, Constant.EventType.actuator);
    assert.equal(aLightActuator.aComponentEvent.type, "actuator");
    assert.equal(aLightActuator.aComponentEvent.eventFireMode, aGenericComponent.eventFireMode);
    assert.deepEqual(aLightActuator.aComponentEvent.position,aGenericComponent.position);
    assert.deepEqual(aLightActuator.aComponentEvent.returnValue, Constant.ComponentSpec.default.data);
    assert.deepEqual(aLightActuator.aComponentEvent.returnValue, null);
    assert.equal(aLightActuator.aComponentEvent.cancelable,Constant.CancelAble.false);

    /* callback function */
    expect(aLightActuator.aComponentEvent.callback).to.be.a('function');

    /* configure the actuator */
    var configuration = {
        componentType:"switch",
        deviceID:"12314213432432423154235",
        returnable: Constant.ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:Constant.EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213},

        maximumRange:10,
        minDelay:40.0,
        power:30.1,
        resolution:55.00,
        vendor:"Huawei",
        version:1.0,

        type : 'actuator',
        cancelable: Constant.CancelAble.true,

        switchMode : Constant.ComponentSpec.default.switchMode.dial,
        strength : 50
    }
    aLightActuator.config(configuration);

    /* configured property */
    assert.equal(aLightActuator.aGenericComponent.componentType, Constant.ComponentSpec.type.actuator.switch);
    assert.equal(aLightActuator.aGenericComponent.componentType, "switch");
    assert.equal(aLightActuator.aGenericComponent.deviceID,"12314213432432423154235");
    assert.equal(aLightActuator.aGenericComponent.returnable,false);
    assert.equal(aLightActuator.aGenericComponent.timeout,200.0);
    assert.equal(aLightActuator.aGenericComponent.rate, 20.0);
    assert.equal(aLightActuator.aGenericComponent.eventFireMode,"valuechange");
    assert.deepEqual(aLightActuator.aGenericComponent.position,{latitude:20.123412,longitude: 81.9023213});

    assert.deepEqual(aLightActuator.switchMode, Constant.ComponentSpec.default.switchMode.dial);
    assert.deepEqual(aLightActuator.switchMode, 'dial');
    assert.deepEqual(aLightActuator.strength,0.5); // calculated by the actuator

    assert.deepEqual(aLightActuator.aGenericComponent.maximumRange, 10);
    assert.deepEqual(aLightActuator.aGenericComponent.minDelay, 40.0);
    assert.deepEqual(aLightActuator.aGenericComponent.power, 30.1);
    assert.deepEqual(aLightActuator.aGenericComponent.resolution, 55.00);
    assert.deepEqual(aLightActuator.aGenericComponent.vendor, "Huawei");
    assert.deepEqual(aLightActuator.aGenericComponent.version,1.0);

    assert.deepEqual(aLightActuator.aComponentEvent.type,'actuator');
    assert.deepEqual(aLightActuator.aComponentEvent.cancelable, true);

});

test("properties - with configuration",function(done){
    var configuration = {
        componentType:"switchTEST", // this should not have been changed
        deviceID:"12314213432432423154235",
        returnable: Constant.ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:Constant.EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213},

        maximumRange:10,
        minDelay:40.0,
        power:30.1,
        resolution:55.00,
        vendor:"Huawei",
        version:1.0,

        type : 'actuator',
        cancelable: Constant.CancelAble.true,

        switchMode : Constant.ComponentSpec.default.switchMode.dial,
        strength : 90
    }

    var configInActuator = {
        componentType:"switch",
        deviceID:"12314213432432423154235",
        returnable: Constant.ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:Constant.EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213},

        maximumRange:10,
        minDelay:40.0,
        power:30.1,
        resolution:55.00,
        vendor:"Huawei",
        version:1.0,

        type : 'actuator',
        cancelable: Constant.CancelAble.true,

        switchMode : 'dial',
        strength : 0.9 // SIMILATION: this has been calculated by the sensor
    };

    var OriginalConfigInSensor = {
        componentType: "switch",
        deviceID: "",
        returnable: true,
        timeout: 100.0,
        rate: 50.0,
        eventFireMode: "fixedinterval",
        position: {latitude:0.0,longitude:0.0},
        maximumRange : null,
        minDelay : null,
        power : null,
        resolution : null,
        vendor : null,
        version : null,

        type : 'actuator',
        cancelable: false,

        switchMode : Constant.ComponentSpec.default.switchMode.onoff,
        strength : Constant.ComponentSpec.default.switch.off
    };

    var aLightActuator = new LightActuator(configuration);

    assert.equal(aLightActuator.aGenericComponent.componentType, Constant.ComponentSpec.type.actuator.switch);
    assert.equal(aLightActuator.aGenericComponent.componentType, "switch");
    assert.equal(aLightActuator.aGenericComponent.deviceID,"12314213432432423154235");
    assert.equal(aLightActuator.aGenericComponent.returnable,false);
    assert.equal(aLightActuator.aGenericComponent.timeout,200.0);
    assert.equal(aLightActuator.aGenericComponent.rate, 20.0);
    assert.equal(aLightActuator.aGenericComponent.eventFireMode,"valuechange");
    assert.deepEqual(aLightActuator.aGenericComponent.position,{latitude:20.123412,longitude: 81.9023213});

    assert.deepEqual(aLightActuator.switchMode, Constant.ComponentSpec.default.switchMode.dial);
    assert.deepEqual(aLightActuator.switchMode, 'dial');
    assert.deepEqual(aLightActuator.strength,0.9);

    assert.deepEqual(aLightActuator.aGenericComponent.maximumRange, 10);
    assert.deepEqual(aLightActuator.aGenericComponent.minDelay, 40.0);
    assert.deepEqual(aLightActuator.aGenericComponent.power, 30.1);
    assert.deepEqual(aLightActuator.aGenericComponent.resolution, 55.00);
    assert.deepEqual(aLightActuator.aGenericComponent.vendor, "Huawei");
    assert.deepEqual(aLightActuator.aGenericComponent.version,1.0);

    assert.deepEqual(aLightActuator.aComponentEvent.type,'actuator');
    assert.deepEqual(aLightActuator.aComponentEvent.cancelable, true);

    assert.deepEqual(aLightActuator.configuration,configInActuator);

    // reset everything
    aLightActuator.resetActuatorState();

    var aGenericSensor = new GenericComponent();

    /* property */
    assert.ok(aLightActuator.aGenericComponent instanceof GenericComponent);
    assert.ok(aLightActuator.aComponentEvent instanceof aLightActuator.aGenericComponent.componentEvent);
    assert.deepEqual(aLightActuator.configuration, OriginalConfigInSensor);

    assert.deepEqual(aLightActuator.switchMode, Constant.ComponentSpec.default.switchMode.onoff);
    assert.deepEqual(aLightActuator.switchMode, 'onoff');
    assert.deepEqual(aLightActuator.strength,false);

    /* configuration */
    assert.equal(aLightActuator.aGenericComponent.componentType, Constant.ComponentSpec.type.actuator.switch);
    assert.equal(aLightActuator.aGenericComponent.componentType, "switch");
    assert.equal(aLightActuator.aGenericComponent.deviceID,"");
    assert.equal(aLightActuator.aGenericComponent.returnable,true);
    assert.equal(aLightActuator.aGenericComponent.timeout,100.0);
    assert.equal(aLightActuator.aGenericComponent.rate, 50.0);
    assert.equal(aLightActuator.aGenericComponent.eventFireMode,"fixedinterval");
    assert.deepEqual(aLightActuator.aGenericComponent.position,{latitude:0.0,longitude:0.0});

    assert.deepEqual(aLightActuator.aGenericComponent.maximumRange, null);
    assert.deepEqual(aLightActuator.aGenericComponent.minDelay, null);
    assert.deepEqual(aLightActuator.aGenericComponent.power, null);
    assert.deepEqual(aLightActuator.aGenericComponent.resolution, null);
    assert.deepEqual(aLightActuator.aGenericComponent.vendor, null);
    assert.deepEqual(aLightActuator.aGenericComponent.version,null);

    assert.equal(aLightActuator.aComponentEvent.type, Constant.EventType.actuator);
    assert.equal(aLightActuator.aComponentEvent.type, "actuator");
    assert.deepEqual(aLightActuator.aComponentEvent.cancelable, false);
    assert.equal(aLightActuator.aComponentEvent.eventFireMode, aGenericSensor.eventFireMode);
    assert.deepEqual(aLightActuator.aComponentEvent.position,aGenericSensor.position);
    assert.deepEqual(aLightActuator.aComponentEvent.returnValue, Constant.ComponentSpec.default.data);
    assert.deepEqual(aLightActuator.aComponentEvent.returnValue, null);
    assert.equal(aLightActuator.aComponentEvent.cancelable,Constant.CancelAble.false);

    /* callback function's behaviour */
    expect(aLightActuator.aComponentEvent.callback).to.be.a('function');
    /* callback function on Generic Sensor API - on the sensor */
    var result = aLightActuator.aComponentEvent.callback(successCB_1);
    /* doAction on Generic Sensor API - on the sensor */
    var result = aLightActuator.switchLight(successCB_2);

    function successCB_1(result){
        assert.ok(true);
        console.log("1");
    }
    function successCB_2(result){
        assert.ok(true);
        console.log("2");
        done();
    }
});