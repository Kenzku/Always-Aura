/**
 * Author: Ken
 * Date: 31/03/2013
 * Time: 19:34
 */
module( "Generic Sensor" );
test("GenericComponent - properties", 7, function() {
    var aGenericSensor = new GenericComponent();
    equal(aGenericSensor.componentType, "");
    equal(aGenericSensor.deviceID,"");
    equal(aGenericSensor.returnable,true);
    equal(aGenericSensor.timeout,100.0);
    equal(aGenericSensor.rate, 50.0);
    equal(aGenericSensor.eventFireMode,"fixedinterval");
    deepEqual(aGenericSensor.position,{latitude:0.0,longitude:0.0});
});
test("GenericComponent - hardware properties", 6, function() {
    var aGenericSensor = new GenericComponent();

    deepEqual(aGenericSensor.maximumRange, null);
    deepEqual(aGenericSensor.minDelay, null);
    deepEqual(aGenericSensor.power, null);
    deepEqual(aGenericSensor.resolution, null);
    deepEqual(aGenericSensor.vendor, null);
    deepEqual(aGenericSensor.version,null);
});

test("GenericComponent - hardware properties initialisation", 18, function() {
    var aGenericSensor = new GenericComponent();

    initialiseHWProperty(aGenericSensor);
});

function initialiseHWProperty(aGenericSensor){
    var options = {
        maximumRange:10,
        minDelay:40.0
    }
    aGenericSensor.configureComponent(options);

    deepEqual(aGenericSensor.maximumRange, 10);
    deepEqual(aGenericSensor.minDelay, 40);
    deepEqual(aGenericSensor.power, null);
    deepEqual(aGenericSensor.resolution, null);
    deepEqual(aGenericSensor.vendor, null);
    deepEqual(aGenericSensor.version,null);

    var options = {
        power:30.1,
        resolution:55.00
    }
    aGenericSensor.configureComponent(options);

    deepEqual(aGenericSensor.maximumRange, 10);
    deepEqual(aGenericSensor.minDelay, 40);
    deepEqual(aGenericSensor.power, 30.1);
    deepEqual(aGenericSensor.resolution, 55.00);
    deepEqual(aGenericSensor.vendor, null);
    deepEqual(aGenericSensor.version,null);

    var options = {
        maximumRange : null,
        power:null,
        vendor:"Huawei",
        version:1.0
    }
    aGenericSensor.configureComponent(options);

    deepEqual(aGenericSensor.maximumRange, null);
    deepEqual(aGenericSensor.minDelay, 40);
    deepEqual(aGenericSensor.power, null);
    deepEqual(aGenericSensor.resolution, 55.00);
    deepEqual(aGenericSensor.vendor, "Huawei");
    deepEqual(aGenericSensor.version, 1.0);
}

test("GenericComponent - property initialisation", 7, function() {
    var aGenericSensor = new GenericComponent();
    var options = {
        componentType:"Temperature",
        deviceID:"12314213432432423154235",
        returnable:ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213}
    }
    aGenericSensor.configureComponent(options);

    equal(aGenericSensor.componentType, "Temperature");
    equal(aGenericSensor.deviceID,"12314213432432423154235");
    equal(aGenericSensor.returnable,false);
    equal(aGenericSensor.timeout,200.0);
    equal(aGenericSensor.rate, 20.0);
    equal(aGenericSensor.eventFireMode,"valuechange");
    deepEqual(aGenericSensor.position,{latitude:20.123412,longitude: 81.9023213});
});

test("GenericComponent - property mixture", 31, function() {
    var aGenericSensor = new GenericComponent();
    var options = {
        componentType:"Temperature",
        deviceID:"12314213432432423154235",
        returnable:ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213}
    }
    aGenericSensor.configureComponent(options);

    equal(aGenericSensor.componentType, "Temperature");
    equal(aGenericSensor.deviceID,"12314213432432423154235");
    equal(aGenericSensor.returnable,false);
    equal(aGenericSensor.timeout,200.0);
    equal(aGenericSensor.rate, 20.0);
    equal(aGenericSensor.eventFireMode,"valuechange");
    deepEqual(aGenericSensor.position,{latitude:20.123412,longitude: 81.9023213});

    deepEqual(aGenericSensor.maximumRange, null);
    deepEqual(aGenericSensor.minDelay, null);
    deepEqual(aGenericSensor.power, null);
    deepEqual(aGenericSensor.resolution, null);
    deepEqual(aGenericSensor.vendor, null);
    deepEqual(aGenericSensor.version,null);

    initialiseHWProperty(aGenericSensor);
});

module( "Generic Sensor Event" );
test("GenericComponent.componentEvent - property", 7, function() {
    var aGenericSensor = new GenericComponent();

    var aSensorEvent = new aGenericSensor.componentEvent();

    equal(aSensorEvent.type, EventType.nothing);
    equal(aSensorEvent.type, "nothing");
    equal(aSensorEvent.eventFireMode,aGenericSensor.eventFireMode);
    deepEqual(aSensorEvent.position,aGenericSensor.position);
    deepEqual(aSensorEvent.returnValue, {});
    equal(aSensorEvent.cancelable,CancelAble.false);
    deepEqual(aSensorEvent.callback,null);
});

test("GenericComponent.componentEvent - property initialise", function() {
    var aGenericSensor = new GenericComponent();

    var aSensorEvent = new aGenericSensor.componentEvent();
    var options = {
        type : EventType.actuator,
        eventFireMode : EventFireMode.valueChange,
        returnValue : {temperature: 10.11}
    }

    aSensorEvent.initComponentEvent(options);
    equal(aSensorEvent.type, EventType.actuator);
    equal(aSensorEvent.type, "actuator");
    equal(aSensorEvent.eventFireMode,EventFireMode.valueChange);
    equal(aSensorEvent.eventFireMode,"valuechange");
    deepEqual(aSensorEvent.position,aGenericSensor.position);
    deepEqual(aSensorEvent.returnValue, {temperature: 10.11});
    equal(aSensorEvent.cancelable,CancelAble.false);
    deepEqual(aSensorEvent.callback,null);

    var options = {
        eventFireMode : EventFireMode.fixedInterval,
        position : {latitude:82.34324,longitude: 70.23413}
    }
    aSensorEvent.initComponentEvent(options);
    equal(aSensorEvent.type, EventType.actuator);
    equal(aSensorEvent.type, "actuator");
    equal(aSensorEvent.eventFireMode,EventFireMode.fixedInterval);
    equal(aSensorEvent.eventFireMode,"fixedinterval");
    deepEqual(aSensorEvent.position,{latitude:82.34324,longitude: 70.23413});
    deepEqual(aSensorEvent.returnValue, {temperature: 10.11});
    equal(aSensorEvent.cancelable,CancelAble.false);
    deepEqual(aSensorEvent.callback,null);

    var options = {
        type : EventType.sensor,
        cancelable : CancelAble.true
    }
    aSensorEvent.initComponentEvent(options);
    equal(aSensorEvent.type, EventType.sensor);
    equal(aSensorEvent.type, "sensor");
    equal(aSensorEvent.eventFireMode,EventFireMode.fixedInterval);
    equal(aSensorEvent.eventFireMode,"fixedinterval");
    deepEqual(aSensorEvent.position,{latitude:82.34324,longitude: 70.23413});
    deepEqual(aSensorEvent.returnValue, {temperature: 10.11});
    equal(aSensorEvent.cancelable,CancelAble.true);
    deepEqual(aSensorEvent.callback,null);

    var options = {
        type : EventType.sensor,
        cancelable : CancelAble.true,
        callback : "this will not work"
    }
    aSensorEvent.initComponentEvent(options);
    equal(aSensorEvent.type, EventType.sensor);
    equal(aSensorEvent.type, "sensor");
    equal(aSensorEvent.eventFireMode,EventFireMode.fixedInterval);
    equal(aSensorEvent.eventFireMode,"fixedinterval");
    deepEqual(aSensorEvent.position,{latitude:82.34324,longitude: 70.23413});
    deepEqual(aSensorEvent.returnValue, {temperature: 10.11});
    equal(aSensorEvent.cancelable,CancelAble.true);
    deepEqual(aSensorEvent.callback,null);
});

test("GenericComponent.componentEvent - event action - nothing", function() {
    var aGenericSensor = new GenericComponent();
    var aSensorEvent = new aGenericSensor.componentEvent();

    var options = {
        callback : null
    }

    deepEqual(aSensorEvent.callback,null);
    deepEqual(aSensorEvent.doAction(),null);

    var options = {
        callback : "this will not work"
    }

    aSensorEvent.initComponentEvent(options);
    deepEqual(aSensorEvent.callback,null);
    deepEqual(aSensorEvent.doAction(),null);

    options = {
        type : EventType.actuator,
        callback : function() { aSensorEvent.state += 1; }
    }

    aSensorEvent.initComponentEvent(options);
    equal(aSensorEvent.type, EventType.actuator);
    deepEqual(typeof aSensorEvent.callback,'function');
    var previousState = aSensorEvent.state;
    aSensorEvent.doAction(); // this function will add one state
    equal(aSensorEvent.state,previousState + 2);
});

