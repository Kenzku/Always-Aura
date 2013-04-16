/**
 * Author: Ken
 * Date: 04/04/2013
 * Time: 16:03
 */
var TemperatureSensor = require('../sensor/TemperatureSensorAPI');
var LightActuator = require('../sensor/LightActuatorAPI');
var Constant = require('../sensor/Constant');
var Light = require('../sensor/Light');

var aComponent;

module.exports = function api_module(cfg){
    // procedures
    var procs = {
        /**
         *  initialise a sensor
         * @param args [type, [config]]
         * @param cb
         */
        'component:init' : function(args,cb){
            var args = args.shift();
            var result = initComponent(args);
            // cb (err, successResult);
            result ? cb(null,result) : cb(Constant.Error.init.type.UNKNOWN);
        },
        /**
         * reset sensor state
         * @param args NOT IN USE
         * @param cb callback function when reset success or failed
         */
        'component:reset' : function(args,cb){
            var result = resetComponent();
            result ? cb(null,result) : cb(Constant.Error.reset.NO_INIT);
        },
        'sensor:getData' : function(args,cb) {
            getData(successCB,errorCB);
            function successCB(data){
                cb(null,data);
            }
            function errorCB(err){
                cb(err);
            }
        },
        'actuator:switchLight' : function(args,cb){
            var result = switchLight(successCB,errorCB);
            if (result == false){
                cb(Constant.Error.reset.NO_INIT);
            }
            function successCB(data){
                cb(null,data);
            }
            function errorCB(err){
                cb(err);
            }
        },
        'room:LightStatus' : function(args,cb){
            var result = LightStatus(successCB,errorCB);
            if (result == false){
                cb(Constant.Error.reset.NO_INIT);
            }
            function successCB(data){
                cb(null,data);
            }
            function errorCB(err){
                cb(err);
            }
        }
    };

    var initAPI = function(cfg,callback){
        if (callback && isFunction(callback)){
            callback();
        }
    }

    if(cfg) {initAPI(cfg);}

    return {
        rpc : {
            call : function(procUri, args, cb){
                if (! procs[procUri]) {
                    return cb('Unknown procedure: ' + procUri);
                }
                procs[procUri](args, cb);
            }
        }
    };

}

function whichComponent(args){
    var type = args.shift();
    var config = args.length == 1 ? args.shift() : null;
    switch (type) {
        case 'temperature':
            if(config && typeof config === 'object'){
                // console.log(config);
                if(config.callback){
                    // for safety reason, even though functions will be eliminated
                    delete config.callback;
                }
                // console.log(config);
                return new TemperatureSensor(config);
            } else{
                return new TemperatureSensor();
            }
            break;
        case 'switch':
            if(config && typeof config === 'object'){
                // console.log(config);
                if(config.callback){
                    // for safety reason, even though functions will be eliminated
                    delete config.callback;
                }
                // console.log(config);
                return new LightActuator(config);
            } else{
                return new LightActuator();
            }
            break;
        default :
            /* -- NOT TESTED YET -- */
            return null;
            break;
    }
}

function initComponent (args) {
    aComponent = whichComponent(args);
    if (aComponent){
        return aComponent.configuration;
    }else{
        return null;
    }
}

function resetComponent (){
    if(!aComponent){
        return false;
    }
    aComponent.resetState();
    return aComponent.configuration;
}

function getData(successCallback,errorCallback) {
    if(!aComponent){
        return false;
    }
    requestDataFromSensor(successCallback,errorCallback);
    // return true does not mean that it is successful to retrieve data
    return true;
}

function requestDataFromSensor(successCallback,errorCallback){
    if(!aComponent){
        return false;
    }
    aComponent.currentTemperature(successCallback,errorCallback);
}

function switchLight(successCallback,errorCallback){
    if(!aComponent){
        return false;
    }
    aComponent.switchLight(Constant.room.id, successCallback, errorCallback);
}

function LightStatus(successCallback,errorCallback){
    var aLight = new Light();
    aLight.checkLightState(Constant.room.id, successCallback,errorCallback);
}