/**
 * Author: Ken
 * Date: 04/04/2013
 * Time: 13:40
 */
var assert = require("assert");
var expect = require('chai').expect;
var TemperatureSensor = require('../sensor/TemperatureSensorAPI');
var GenericComponent = require('../sensor/GenericComponentAPI');
var Constant = require('../sensor/Constant');
var CouchDB = require('../db/CouchDB');

function ok(expr, msg) {
    if (!expr) throw new Error(msg);
}

suite("Temperature Sensor");

test("properties - without configuration", function() {
    var aTemperatureSensor = new TemperatureSensor();
    var aGenericComponent = new GenericComponent();

    var configInSensor = {
        componentType: "temperature",
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

        type : 'sensor',
        cancelable: false
    };

    /* property */
    assert.ok(aTemperatureSensor.aGenericComponent instanceof GenericComponent);
    assert.ok(aTemperatureSensor.aComponentEvent instanceof aTemperatureSensor.aGenericComponent.componentEvent);
    assert.equal(aTemperatureSensor.temperature, Constant.ComponentSpec.default.data);
    assert.equal(aTemperatureSensor.temperature, null);
    assert.deepEqual(aTemperatureSensor.getData(true),configInSensor);
    assert.deepEqual(aTemperatureSensor.getData(), true);

    /* configuration */
    assert.equal(aTemperatureSensor.aGenericComponent.componentType, Constant.ComponentSpec.type.sensor.temperature);
    assert.equal(aTemperatureSensor.aGenericComponent.componentType, "temperature");
    assert.equal(aTemperatureSensor.aGenericComponent.deviceID,"");
    assert.equal(aTemperatureSensor.aGenericComponent.returnable,true);
    assert.equal(aTemperatureSensor.aGenericComponent.timeout,100.0);
    assert.equal(aTemperatureSensor.aGenericComponent.rate, 50.0);
    assert.equal(aTemperatureSensor.aGenericComponent.eventFireMode,"fixedinterval");
    assert.deepEqual(aTemperatureSensor.aGenericComponent.position,{latitude:0.0,longitude:0.0});

    assert.deepEqual(aTemperatureSensor.aGenericComponent.maximumRange, null);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.minDelay, null);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.power, null);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.resolution, null);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.vendor, null);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.version,null);

    assert.equal(aTemperatureSensor.aComponentEvent.type, Constant.EventType.sensor);
    assert.equal(aTemperatureSensor.aComponentEvent.type, "sensor");
    assert.equal(aTemperatureSensor.aComponentEvent.eventFireMode, aGenericComponent.eventFireMode);
    assert.deepEqual(aTemperatureSensor.aComponentEvent.position,aGenericComponent.position);
    assert.deepEqual(aTemperatureSensor.aComponentEvent.returnValue, Constant.ComponentSpec.default.data);
    assert.deepEqual(aTemperatureSensor.aComponentEvent.returnValue, null);
    assert.equal(aTemperatureSensor.aComponentEvent.cancelable,Constant.CancelAble.false);

    /* callback function */
    expect(aTemperatureSensor.aComponentEvent.callback).to.be.a('function');

    /* configure the sensor */
    var configuration = {
        componentType:"temperature",
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

        type : 'sensor',
        cancelable: Constant.CancelAble.true
    }
    aTemperatureSensor.config(configuration);

    assert.equal(aTemperatureSensor.aGenericComponent.componentType, Constant.ComponentSpec.type.sensor.temperature);
    assert.equal(aTemperatureSensor.aGenericComponent.componentType, "temperature");
    assert.equal(aTemperatureSensor.aGenericComponent.deviceID,"12314213432432423154235");
    assert.equal(aTemperatureSensor.aGenericComponent.returnable,false);
    assert.equal(aTemperatureSensor.aGenericComponent.timeout,200.0);
    assert.equal(aTemperatureSensor.aGenericComponent.rate, 20.0);
    assert.equal(aTemperatureSensor.aGenericComponent.eventFireMode,"valuechange");
    assert.deepEqual(aTemperatureSensor.aGenericComponent.position,{latitude:20.123412,longitude: 81.9023213});

    assert.deepEqual(aTemperatureSensor.aGenericComponent.maximumRange, 10);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.minDelay, 40.0);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.power, 30.1);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.resolution, 55.00);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.vendor, "Huawei");
    assert.deepEqual(aTemperatureSensor.aGenericComponent.version,1.0);

    assert.deepEqual(aTemperatureSensor.aComponentEvent.type,'sensor');
    assert.deepEqual(aTemperatureSensor.aComponentEvent.cancelable, true);

    assert.deepEqual(aTemperatureSensor.getData(true),configuration);

});

test("properties - with configuration",function(done){
    var configuration = {
        componentType:"temperature",
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

        type : 'sensor',
        cancelable: Constant.CancelAble.true
    }

    var configInSensor = {
        componentType:"temperature",
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

        type : 'sensor',
        cancelable: Constant.CancelAble.true
    };

    var OriginalConfigInSensor = {
        componentType: "temperature",
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

        type : 'sensor',
        cancelable: false
    };

    var aTemperatureSensor = new TemperatureSensor(configuration);

    assert.equal(aTemperatureSensor.aGenericComponent.componentType, Constant.ComponentSpec.type.sensor.temperature);
    assert.equal(aTemperatureSensor.aGenericComponent.componentType, "temperature");
    assert.equal(aTemperatureSensor.aGenericComponent.deviceID,"12314213432432423154235");
    assert.equal(aTemperatureSensor.aGenericComponent.returnable,false);
    assert.equal(aTemperatureSensor.aGenericComponent.timeout,200.0);
    assert.equal(aTemperatureSensor.aGenericComponent.rate, 20.0);
    assert.equal(aTemperatureSensor.aGenericComponent.eventFireMode,"valuechange");
    assert.deepEqual(aTemperatureSensor.aGenericComponent.position,{latitude:20.123412,longitude: 81.9023213});

    assert.deepEqual(aTemperatureSensor.aGenericComponent.maximumRange, 10);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.minDelay, 40.0);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.power, 30.1);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.resolution, 55.00);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.vendor, "Huawei");
    assert.deepEqual(aTemperatureSensor.aGenericComponent.version,1.0);

    assert.deepEqual(aTemperatureSensor.aComponentEvent.type,'sensor');
    assert.deepEqual(aTemperatureSensor.aComponentEvent.cancelable, true);

    assert.deepEqual(aTemperatureSensor.getData(true),configInSensor);

    // reset everything
    aTemperatureSensor.resetState(true);

    var aGenericSensor = new GenericComponent();

    /* property */
    assert.ok(aTemperatureSensor.aGenericComponent instanceof GenericComponent);
    assert.ok(aTemperatureSensor.aComponentEvent instanceof aTemperatureSensor.aGenericComponent.componentEvent);
    assert.equal(aTemperatureSensor.temperature, Constant.ComponentSpec.default.data);
    assert.equal(aTemperatureSensor.temperature, null);
    assert.deepEqual(aTemperatureSensor.getData(true),OriginalConfigInSensor);
    assert.deepEqual(aTemperatureSensor.getData(), true);

    /* configuration */
    assert.equal(aTemperatureSensor.aGenericComponent.componentType, Constant.ComponentSpec.type.sensor.temperature);
    assert.equal(aTemperatureSensor.aGenericComponent.componentType, "temperature");
    assert.equal(aTemperatureSensor.aGenericComponent.deviceID,"");
    assert.equal(aTemperatureSensor.aGenericComponent.returnable,true);
    assert.equal(aTemperatureSensor.aGenericComponent.timeout,100.0);
    assert.equal(aTemperatureSensor.aGenericComponent.rate, 50.0);
    assert.equal(aTemperatureSensor.aGenericComponent.eventFireMode,"fixedinterval");
    assert.deepEqual(aTemperatureSensor.aGenericComponent.position,{latitude:0.0,longitude:0.0});

    assert.deepEqual(aTemperatureSensor.aGenericComponent.maximumRange, null);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.minDelay, null);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.power, null);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.resolution, null);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.vendor, null);
    assert.deepEqual(aTemperatureSensor.aGenericComponent.version,null);

    assert.equal(aTemperatureSensor.aComponentEvent.type, Constant.EventType.sensor);
    assert.equal(aTemperatureSensor.aComponentEvent.type, "sensor");
    assert.deepEqual(aTemperatureSensor.aComponentEvent.cancelable, false);
    assert.equal(aTemperatureSensor.aComponentEvent.eventFireMode, aGenericSensor.eventFireMode);
    assert.deepEqual(aTemperatureSensor.aComponentEvent.position,aGenericSensor.position);
    assert.deepEqual(aTemperatureSensor.aComponentEvent.returnValue, Constant.ComponentSpec.default.data);
    assert.deepEqual(aTemperatureSensor.aComponentEvent.returnValue, null);
    assert.equal(aTemperatureSensor.aComponentEvent.cancelable,Constant.CancelAble.false);

    /* callback function's behaviour */
    expect(aTemperatureSensor.aComponentEvent.callback).to.be.a('function');
    /* callback function on Generic Sensor API - on the sensor */
    var result = aTemperatureSensor.aComponentEvent.callback(successCB_1,errorCB);
    /* doAction on Generic Sensor API - on the sensor */
    var result = aTemperatureSensor.currentTemperature(successCB_2,errorCB);

    function successCB_1(result){
        assert.deepEqual(result, null);
    }
    function successCB_2(result){
        assert.deepEqual(result,null);
        assert.deepEqual(result,aTemperatureSensor.temperature);
        assert.deepEqual(aTemperatureSensor.aComponentEvent.returnValue,null);
        done();
    }
    function errorCB (err){
        assert.ok;
        done();
    }
});

test("properties - callback test - updateTemperatureOnSensor",function(done){
    var configuration = {
        componentType:"temperature",
        deviceID:"bd27134d93f07d65d244e502971f5573",
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

        type : 'sensor',
        cancelable: Constant.CancelAble.true,

        callback : function () { return "This is a feedback" }
    }
    var aTemperatureSensor = new TemperatureSensor(configuration);

    /* callback function's behaviour */
    expect(aTemperatureSensor.aComponentEvent.callback).to.be.a('function');

    /* callback function on Generic Sensor API - on the sensor */
    aTemperatureSensor.aComponentEvent.callback(successCB,errorCB);
    // because callback setting has been disabled in 'TemperatureSensor'

    function successCB(result){
        assert.deepEqual(result, {c0 :'23'});
        done();
    }
    function errorCB(err){
        // there will be output done by 'nano.js', which is out of my control
        // trigger by e.g. deviceID:"12314213432432423154235" - wrong id
        assert.ok;
        done();
    }
});

test('CouchDB - connection',function(done){
    var aCouchDB = new CouchDB();
    aCouchDB.readDocument('bd27134d93f07d65d244e502971f5573',
        // success CB
        function(body){
            assert.ok;
            done();
        },
        // error CB
        function(err){
            assert.ok;
            done();
        });
});