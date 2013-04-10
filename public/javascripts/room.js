/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 11:52
 */

function Room() {
    var self = this;

    self.sess = CONSTANT.WAMP.SESSION.DEFAULT;

    self.comeIn = function comeIn(successCallback,errorCallback) {
        // init WAMP connection
        init(successCB,errorCB);

        // call on WAMP connection successfully establish
        function successCB(session){
            self.sess = session;
            // establish a prefix, so we can abbreviate procedure URIs.
            self.sess.prefix("actuator", "http://localhost" + CONSTANT.PORT + "/actuator#");

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

    self.switchLightOn = function (successCallback,errorCallback){

    }
}