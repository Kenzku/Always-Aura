/**
 * Author: Ken
 * Date: 11/04/2013
 * Time: 17:49
 */
define(['../javascripts/api/lightactuatorapi.js',
    '../javascripts/initwamp.js',
    '../javascripts/Constant.js'],function(LightActuatorAPI,init){
 return Light;
});

function Light() {
    var self = this;

    self.sess = null;

    self.init = function(onLightStatusChange, successCallback, errorCallback){
        // init WAMP connection
        init(successCB,errorCB);

        // call on WAMP connection successfully establish
        function successCB(session){
            self.sess = session;
            self.sess.prefix("room", "http://"+CONSTANT.DOMAIN + ":" + CONSTANT.PORT +  "/room#");
            self.sess.subscribe("room:lightStatus", onLightStatusChange);
            if (successCallback && typeof successCallback === 'function'){
                successCallback (session);
            }
        }
        // call on WAMP connection failed on establish
        function errorCB(error){
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(error);
            }else{
                throw error;
            }
        }
    }

    self.lightStatus = function (successCallback, errorCallback){
        var aLightActuatorAPI = new LightActuatorAPI();
        if (self.sess){
            aLightActuatorAPI.lightStatus(self.sess, successCallback, errorCallback);
        }else{
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(CONSTANT.ERROR.LIGHT.LIGHT_STATUS);
            }else{
                throw CONSTANT.ERROR.LIGHT.LIGHT_STATUS;
            }
        }
    }

    self.updateLightUI = function (newStatus){
        console.log("Now data is : " + newStatus);
        if (newStatus){
            $('body').attr('class','lightOn');
        }else{
            $('body').attr('class','lightOff');
        }

    }
}