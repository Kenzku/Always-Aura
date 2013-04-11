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
    /**
     * establish a prefix, so we can abbreviate procedure URIs
     * component will stand for http://localhost:3000/calc#
     */
    session.prefix("component", "http://localhost" + CONSTANT.PORT + "/component#");
    session.prefix("actuator", "http://localhost" + CONSTANT.PORT + "/actuator#");

}
function errorCB(reason){
    sess = null;
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

    function errorCB (err) {
        console.log(err);
        ok();
        start();
    }

    setTimeout(function(){
        initComponent(sess,'switch',null,successCB,errorCB);
    },2000);
});

asyncTest('init an actuator - with configuration',function(){
    var configuration = {
        componentType: 'switch',
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

        type : 'actuator',
        cancelable: true,

        switchMode : CONSTANT.COMPONENT_SPEC.DEFAULT.SWITCH_MODE.DIAL,
        strength : 90
    };

    function successCB(result){
        var configuration_copy = configuration;
        configuration_copy.strength = 0.9;
        deepEqual(result,configuration_copy);
        start();
    }
    function errorCB (err) {
        console.log(err);
        ok(true);
        start();
    }

    setTimeout(function(){
        initComponent(sess,'switch',configuration, successCB,errorCB);
    },2000);
});

asyncTest('init an actuator - with configuration - reset actuator',function(){
    var configuration = {
        componentType: 'switch',
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

        type : 'actuator',
        cancelable: true
    };

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
        deepEqual(result, OriginalConfiguration);
        start();
    }

    setTimeout(function(){
        /* init a sensor with configuration */
        initComponent(sess,'switch',configuration);
        /* reset the configuration */
        resetComponent(sess, successCB);
    },2000);

});