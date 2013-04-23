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
var CouchDB = require('../db/CouchDB');

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

        switchMode : Constant.ComponentSpec.default.switchMode.dimmer,
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

    assert.deepEqual(aLightActuator.switchMode, Constant.ComponentSpec.default.switchMode.dimmer);
    assert.deepEqual(aLightActuator.switchMode, 'dimmer');
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

test("properties - with configuration",function(){
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

        switchMode : Constant.ComponentSpec.default.switchMode.dimmer,
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

        switchMode : 'dimmer',
        strength : 0.9 // SIMULATION: this has been calculated by the sensor
    };

    var OriginalConfigInActuator = {
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

    assert.deepEqual(aLightActuator.switchMode, Constant.ComponentSpec.default.switchMode.dimmer);
    assert.deepEqual(aLightActuator.switchMode, 'dimmer');
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
    aLightActuator.resetState();

    var aGenericComponent = new GenericComponent();

    /* property */
    assert.ok(aLightActuator.aGenericComponent instanceof GenericComponent);
    assert.ok(aLightActuator.aComponentEvent instanceof aLightActuator.aGenericComponent.componentEvent);
    assert.deepEqual(aLightActuator.configuration, OriginalConfigInActuator);

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
    assert.equal(aLightActuator.aComponentEvent.eventFireMode, aGenericComponent.eventFireMode);
    assert.deepEqual(aLightActuator.aComponentEvent.position,aGenericComponent.position);
    assert.deepEqual(aLightActuator.aComponentEvent.returnValue, Constant.ComponentSpec.default.data);
    assert.deepEqual(aLightActuator.aComponentEvent.returnValue, null);
    assert.equal(aLightActuator.aComponentEvent.cancelable,Constant.CancelAble.false);
});

test('switch light',function(done){
    var aLightActuator = new LightActuator();
    /* callback function's behaviour */
    expect(aLightActuator.aComponentEvent.callback).to.be.a('function');
    /* callback function on Generic Component API - on the Component */
    var result = aLightActuator.aComponentEvent.callback(Constant.room.id,successCB_1,errorCB_1);

    function successCB_1(result){
        assert.ok(true);
        /* doAction on Generic Component API - on the Component */
        var result = aLightActuator.switchLight(Constant.room.id,successCB_2,errorCB_2);
    }
    function errorCB_1(err){
        console.log("Error 1: " + err);
        // I would like the test stop
        assert.ok(false);
    }
    function successCB_2(result){
        assert.ok(true);
        done();
    }
    function errorCB_2(err){
        console.log("Error 2: " + err);
        // I would like the test stop
        assert.ok(false);
        done();
    }
})

//mocha ./test/LightActuatorAPITest.js -R spec -u qunit -g switchLight -t 6000
test('switch light - switchLight()',function(done){
    var aLightActuator = new LightActuator();

    aLightActuator.switchLight(Constant.room.id,successCB,errorCB);

    function successCB(result){
        console.log(result);
        assert.ok(true);
        done();
    }

    function errorCB(err){
        assert.ok(false,err);
        done();
    }
});
//mocha ./test/LightActuatorAPITest.js -R spec -u qunit -g adjustLuminance -t 6000
test('adjust luminance - self.adjustLuminance', function(done){
    var aLightActuator = new LightActuator({switchMode:Constant.ComponentSpec.default.switchMode.dimmer});
    aLightActuator.adjustLuminance(Constant.room.id,50,successCB,errorCB);

    function successCB(result){
        console.log(result);
        assert.ok(true);
        done();
    }

    function errorCB(err){
        assert.ok(false,err);
        done();
    }
});
//mocha ./test/LightActuatorAPITest.js -R spec -u qunit -g 'if strength > 0, light on'
test('adjust luminance - if strength > 0, light on',function(done){
    var aLightActuator = new LightActuator({switchMode:Constant.ComponentSpec.default.switchMode.dimmer});
    aLightActuator.adjustLuminance(Constant.room.id,60,successCB,errorCB);

    function successCB(result){
        expect(result).to.be.an('object');
        expect(result).to.have.property('ok',true);
        expect(result).to.have.property('id');

        var aCouchDB = new CouchDB('room');
        aCouchDB.readDocument(result.id,successCB_1,errorCB);
    }

    function errorCB(err){
        assert.ok(false,err);
        done();
    }

    function successCB_1(body){
        assert.equal(body.isLightOn,true);
        assert.equal(body.strength,60);
        done();

    }
});
//mocha ./test/LightActuatorAPITest.js -R spec -u qunit -g 'if strength = 0, light off'
test('adjust luminance - if strength = 0, light off',function(done){
    var aLightActuator = new LightActuator({switchMode:Constant.ComponentSpec.default.switchMode.dimmer});
    aLightActuator.adjustLuminance(Constant.room.id,0,successCB,errorCB);

    function successCB(body){
        expect(body).to.be.an('object');
        expect(body).to.have.property('ok',true);
        expect(body).to.have.property('id');

        var aCouchDB = new CouchDB('room');
        aCouchDB.readDocument(body.id,successCB_1,errorCB);
    }

    function errorCB(err){
        assert.ok(false,err);
        done();
    }

    function successCB_1(body){
        assert.equal(body.isLightOn,false);
        assert.equal(body.strength,0);
        done();

    }
});

//mocha ./test/LightActuatorAPITest.js -R spec -u qunit -g 'strength should be limited'
test('adjust luminance - strength should be limited - less than 0',function(done){
    var aLightActuator = new LightActuator({switchMode:Constant.ComponentSpec.default.switchMode.dimmer});
    aLightActuator.adjustLuminance(Constant.room.id,-10,null,errorCB);

    function errorCB(err){
        assert.equal(err,Constant.Error.Light.strength);
        done();
    }
});

test('adjust luminance - strength should be limited - greater than 100',function(done){
    var aLightActuator = new LightActuator({switchMode:Constant.ComponentSpec.default.switchMode.dimmer});
    aLightActuator.adjustLuminance(Constant.room.id,130,null,errorCB);

    function errorCB(err){
        assert.equal(err,Constant.Error.Light.strength);
        done();
    }
});

// mocha ./test/LightActuatorAPITest.js -R spec -u qunit -g 'Switch light on'
test('Switch light on - dimmer - should be nothing to do with its mode',function(done){
    var aLightActuator = new LightActuator({switchMode:Constant.ComponentSpec.default.switchMode.dimmer});
    assert.equal(aLightActuator.switchMode,Constant.ComponentSpec.default.switchMode.dimmer);

    aLightActuator.switchOn(Constant.room.id,successCB,errorCB);

    function successCB (body){

        expect(body).to.be.an('object');
        expect(body).to.have.property('ok',true);
        expect(body).to.have.property('id');

        var aCouchDB = new CouchDB('room');
        aCouchDB.readDocument(body.id,successCB_1,errorCB);
    }

    function errorCB(err){
        assert.ok(false,err);
        done();
    }

    function successCB_1 (body){
        assert.equal(body.isLightOn,Constant.ComponentSpec.default.switch.on);
        done();
    }
});

test('Switch light on - onoff - should be nothing to do with its mode',function(done){
    var aLightActuator = new LightActuator();
    assert.equal(aLightActuator.switchMode,Constant.ComponentSpec.default.switchMode.onoff);

    aLightActuator.switchOn(Constant.room.id,successCB,errorCB);

    function successCB (body){
        expect(body).to.be.an('object');
        expect(body).to.have.property('ok',true);
        expect(body).to.have.property('id');

        var aCouchDB = new CouchDB('room');
        aCouchDB.readDocument(body.id,successCB_1,errorCB);
    }

    function errorCB(err){
        assert.ok(false,err);
        done();
    }

    function successCB_1 (body){
        assert.equal(body.isLightOn,Constant.ComponentSpec.default.switch.on);
        done();
    }
});
// mocha ./test/LightActuatorAPITest.js -R spec -u qunit -g 'Switch light off'
test('Switch light off - dimmer - should effect its strength',function(done){
    var aLightActuator = new LightActuator({switchMode:Constant.ComponentSpec.default.switchMode.dimmer});
    assert.equal(aLightActuator.switchMode,Constant.ComponentSpec.default.switchMode.dimmer);

    aLightActuator.switchOff(Constant.room.id,successCB,errorCB);

    function successCB (body){

        expect(body).to.be.an('object');
        expect(body).to.have.property('ok',true);
        expect(body).to.have.property('id');

        var aCouchDB = new CouchDB('room');
        aCouchDB.readDocument(body.id,successCB_1,errorCB);
    }

    function errorCB(err){
        assert.ok(false,err);
        done();
    }

    function successCB_1 (body){
        assert.equal(body.isLightOn,Constant.ComponentSpec.default.switch.off);
        assert.equal(body.strength,Constant.ComponentSpec.default.dimmer.strength); // should be both 0
        done();
    }
});

test('Switch light off - onoff - should have nothing to do with strength',function(done){
    var aLightActuator = new LightActuator();
    assert.equal(aLightActuator.switchMode,Constant.ComponentSpec.default.switchMode.onoff);

    aLightActuator.switchOff(Constant.room.id,successCB,errorCB);

    function successCB (body){

        expect(body).to.be.an('object');
        expect(body).to.have.property('ok',true);
        expect(body).to.have.property('id');

        var aCouchDB = new CouchDB('room');
        aCouchDB.readDocument(body.id,successCB_1,errorCB);
    }

    function errorCB(err){
        assert.ok(false,err);
        done();
    }

    function successCB_1 (body){
        assert.equal(body.isLightOn,Constant.ComponentSpec.default.switch.off);
        done();
    }
});