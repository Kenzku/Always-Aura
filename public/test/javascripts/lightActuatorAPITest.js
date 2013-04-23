/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 15:03
 */
define(['../../javascripts/api/lightactuatorapi.js',
        '../../javascripts/api/componentapi.js',
        '../../javascripts/Constant.js',
        '../../javascripts/initwamp'],function (LightActuatorAPI,ComponentAPI,CONSTANT,init) {
        return {
            RunTests: function () {
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

                    function successCB_2(result){
                        deepEqual(result,OriginalConfiguration);
                        start();
                    }

                    function errorCB_2 (err) {
                        ok(false,err);
                        start();
                    }

                    function successCB_1 (session){
                        /**
                         * establish a prefix, so we can abbreviate procedure URIs
                         * component will stand for http://localhost:3000/calc#
                         */
                        session.prefix("component", "http://"+CONSTANT.DOMAIN + ":" + CONSTANT.PORT + "/component#");
                        session.prefix("actuator", "http://"+CONSTANT.DOMAIN + ":" +CONSTANT.PORT + "/actuator#");

                        var aComponentAPI = new ComponentAPI();
                        aComponentAPI.initComponent(session,'switch',null,successCB_2,errorCB_2);
                    }
                    function errorCB_2 (reason){
                        ok(false,reason);
                    }

                    init(successCB_1, errorCB_2);

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

                        switchMode : CONSTANT.COMPONENT_SPEC.DEFAULT.SWITCH_MODE.DIMMER,
                        strength : 90
                    };

                    function successCB_2(result){
                        var configuration_copy = configuration;
                        configuration_copy.strength = 0.9;
                        deepEqual(result,configuration_copy);
                        start();
                    }
                    function errorCB_2 (err) {
                        ok(false,err);
                        start();
                    }

                    function successCB_1 (session){
                        /**
                         * establish a prefix, so we can abbreviate procedure URIs
                         * component will stand for http://localhost:3000/calc#
                         */
                        session.prefix("component", "http://"+CONSTANT.DOMAIN + ":" + CONSTANT.PORT + "/component#");
                        session.prefix("actuator", "http://"+CONSTANT.DOMAIN + ":" +CONSTANT.PORT + "/actuator#");

                        var aComponentAPI = new ComponentAPI();
                        aComponentAPI.initComponent(session,'switch',configuration,successCB_2,errorCB_2);
                    }
                    function errorCB_2 (reason){
                        ok(false,reason);
                    }

                    init(successCB_1, errorCB_2);
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

                    function errorCB_2 (err) {
                        console.log(err);
                        ok(false,err);
                        start();
                    }
                    function successCB_1 (session){
                        /**
                         * establish a prefix, so we can abbreviate procedure URIs
                         * component will stand for http://localhost:3000/calc#
                         */
                        session.prefix("component", "http://"+CONSTANT.DOMAIN + ":" + CONSTANT.PORT + "/component#");
                        session.prefix("actuator", "http://"+CONSTANT.DOMAIN + ":" +CONSTANT.PORT + "/actuator#");

                        var aComponentAPI = new ComponentAPI();
                        /* init a sensor with configuration */
                        aComponentAPI.initComponent(session,'switch',configuration,null,errorCB_2);
                        /* reset the configuration */
                        aComponentAPI.resetComponent(session, successCB_3);
                    }

                    function errorCB_3 (reason){
                        ok(false,reason);
                        start();
                    }

                    init(successCB_1, errorCB_2);

                    function successCB_3 (result){
                        deepEqual(result, OriginalConfiguration);
                        start();
                    }
                });

                asyncTest('Switch On - ignore current state', function(){
                    init(successCB, errorCB);

                    function successCB (session){
                        var aLightActuatorAPI = new LightActuatorAPI();
                        aLightActuatorAPI.switchOn(session,rpcSuccessCB,errorCB);
                    }

                    function errorCB(error){
                        ok(false, error);
                        start();
                    }

                    function rpcSuccessCB (body){
                        equal(body.ok,true);
                        start();
                    }
                });

                asyncTest('Switch Off - ignore current state', function(){
                    init(successCB, errorCB);

                    function successCB (session){
                        var aLightActuatorAPI = new LightActuatorAPI();
                        aLightActuatorAPI.switchOff(session,rpcSuccessCB,errorCB);
                    }

                    function errorCB(error){
                        ok(false, error);
                        start();
                    }

                    function rpcSuccessCB (body){
                        equal(body.ok,true);
                        start();
                    }
                });
            }
        }
    }
);