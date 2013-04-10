/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 15:03
 */
// WAMP Server session
var sess;
// connect to WAMP Server
window.onload = init(successCB, errorCB);
function successCB (session){
    sess = session;
}
function errorCB(reason){
    sess = null;
    throw reason;
}

module('Actuator on Client-side');

asyncTest('init an actuator - without configuration',function(){
    var OriginalConfiguration = {
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

        switchMode : CONSTANT.COMPONENT_SPEC.DEFAULT.SWITCH_MODE.ON_OFF,
        strength : CONSTANT.COMPONENT_SPEC.DEFAULT.SWITCH.OFF
    };

    function successCB(result){
        deepEqual(result,OriginalConfiguration);
        start();
    }
    setTimeout(function(){
        initActuator(sess,'switch',null,successCB);
    },2000);
});

asyncTest('init an actuator - with configuration',function(){
    var configuration = {
        componentType: 'temperature',
        deviceID:"12314213432432423154235",
        returnable: false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:'valuechange',
        position:{latitude:20.123412,longitude: 81.9023213},

        maximumRange:10,
        minDelay:40.0,
        power:30.1,
        resolution:55.00,
        vendor:'Huawei',
        version:1.0,

        type : 'sensor',
        cancelable: true
    };

    function successCB(result){
        deepEqual(result,configuration);
        start();
    }

    setTimeout(function(){
        initActuator(sess,'temperature',configuration, successCB);
    },2000);
});

asyncTest('init an actuator - with configuration - reset actuator',function(){
    var configuration = {
        componentType: 'temperature',
        deviceID:"12314213432432423154235",
        returnable: false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:'valuechange',
        position:{latitude:20.123412,longitude: 81.9023213},

        maximumRange:10,
        minDelay:40.0,
        power:30.1,
        resolution:55.00,
        vendor:'Huawei',
        version:1.0,

        type : 'sensor',
        cancelable: true
    };

    var OriginalConfiguration = {
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

    function successCB(result){
        deepEqual(result, OriginalConfiguration);
        start();
    }

    setTimeout(function(){
        /* init a sensor with configuration */
        initActuator(sess,'temperature',configuration);
        /* reset the configuration */
        resetActuator(sess, successCB);
    },2000);

});