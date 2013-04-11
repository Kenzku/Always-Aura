/**
 * Author: Ken
 * Date: 05/04/2013
 * Time: 10:19
 */

// WAMP Server se
var sess;

// connect to WAMP Server
window.onload = init(successCB, errorCB);
function successCB (session){
    sess = session;
    session.prefix("component", "http://localhost" + CONSTANT.PORT + "/component#");
    session.prefix("sensor", "http://localhost" + CONSTANT.PORT + "/sensor#");
}
function errorCB(reason){
    sess = null;
}

module('Temperature Sensor on Client-side');
asyncTest('init a sensor - without configuration',function(){
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
        deepEqual(result,OriginalConfiguration);
        start();
    }

    setTimeout(function(){
        initComponent(sess, 'temperature',null,successCB);
    },2000);

});

asyncTest('init a sensor - with configuration',function(){
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
        initComponent(sess, 'temperature',configuration, successCB);
    },2000);
});

asyncTest('init a sensor - with configuration - reset sensor',function(){
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
        initComponent(sess, 'temperature',configuration);
        /* reset the configuration */
        resetComponent(sess, successCB);
    },2000);

});

asyncTest('get data from temperature sensor - with isInit == null - get currentTemperature', function(){
    var configuration = {
        componentType: 'temperature',
        deviceID:"bd27134d93f07d65d244e502971f5573",
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
        /* because {c0:5} is the default temperature data */
        deepEqual(result,{c0:'23'});
        start();
    }
    function errorCB (err){
        ok(true,'error callback trigger');
        start();
    }

    setTimeout(function(){
        /* original data before init is tested on the server side */

        /* init a sensor with configuration */
        initComponent(sess, 'temperature',configuration);
        /* get data from the sensor */
        getData(sess, successCB,errorCB);
    },2000);
});