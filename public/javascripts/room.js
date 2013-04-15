/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 11:52
 */

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
            if (successCallback && typeof successCallback === 'function'){
                successCallback(self.sess);
            }
        }

        // call on WAMP connection failed
        function errorCB(error){
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(error);
            }else{
//                throw error;
            }
        }

    }

    self.lightStatus = function (successCallback, errorCallback){
        // make an RPC to check
    }

    self.switchLight = function (onSwitchedLight, successCallback, errorCallback){
        if (onSwitchedLight && typeof onSwitchedLight === 'function'){
            subscribe(onSwitchedLight);
        }else{
            subscribe();
        }

        function subscribe(onSwitchedLight){
            if (onSwitchedLight){
                self.sess.subscribe("room:switchLight", onSwitchedLight);
            }else{
                self.sess.subscribe("room:switchLight");
            }

        }
    }
}