/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 11:52
 */
define(['../javascripts/api/lightactuatorapi.js',
        '../javascripts/initwamp.js',
        '../javascripts/api/componentapi.js',
        '../javascripts/Constant.js'],
function(LightActuatorAPI,init, ComponentAPI,CONSTANT){
   return Room;
});

function Room() {
    var self = this;

    self.sess = CONSTANT.WAMP.SESSION.DEFAULT;

    self.comeIn = function (successCallback,errorCallback) {
        // init WAMP connection
        init(successCB,errorCB);

        // call on WAMP connection successfully establish
        function successCB(session){
            self.sess = session;
            self.sess.prefix("room", "http://"+CONSTANT.DOMAIN + ":" + CONSTANT.PORT +  "/room#");
            self.sess.prefix("actuator", "http://"+CONSTANT.DOMAIN + ":" + CONSTANT.PORT +  "/actuator#");

            // initComponent
            var aComponentAPI = new ComponentAPI();
            aComponentAPI.initComponent(self.sess,'switch',null,onSwitchReady,errorCallback);
        }

        /**
         * when successfully initialise the component
         * @param res {String} rpc callback value
         */
        function onSwitchReady (res){
            if (successCallback && typeof successCallback === 'function'){
                successCallback(self.sess);
            }
        }

        // call on WAMP connection failed
        function errorCB(error){
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(error);
            }else{
                throw error;
            }
        }
    }

    self.lightStatus = function (successCallback, errorCallback){
        // make an RPC to check
    }


    /**
     * the room can turn on the light, because it has a switch
     * @param onSwitchedLight (topicUri, data) where the data define in /lib/handlers.js
     * @param successCallback (boolean) the status of the light, after switch
     * @param errorCallback (err)
     */
    self.switchLight = function (onSwitchedLight, successCallback, errorCallback){
        var aLightActuatorAPI = new LightActuatorAPI();
        aLightActuatorAPI.switchLight(self.sess, onSwitchedLight, rpcSuccessCB, errorCallback);

        function rpcSuccessCB (data) {
            console.log("I am switching the light!");
            self.sess.publish("room:lightStatus",{'turnLightTo': data});
        }
    }

    self.switchUI = function (onSwitchedLight, successCallback, errorCallback){
        $(document).on('click','#lightSwitch',self.switchLight);
    }
}