/**
 * Author: Ken
 * Date: 16/04/2013
 * Time: 21:21
 */
var CouchDB = require('../db/CouchDB');
var Constant = require('../sensor/Constant');

function Light() {
    var self = this;
    /**
     *
     * @param roomId {String} the id of the room
     * @param successCallback
     * @param errorCallback
     */
    self.checkLightState = function (roomId, successCallback,errorCallback){
        if (!roomId || typeof roomId === 'function'){
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(Constant.Error.LightActuator.room);
            }else{
                throw Constant.Error.LightActuator.room;
            }
        }
        var aCouchDB = new CouchDB('room');
        aCouchDB.readDocument(Constant.room.id, successCB, errorCallback);

        // success callback to aCouchDB.readDocument
        function successCB (body){
            if (body && body.hasOwnProperty('isLightOn')){
                if(successCallback && typeof successCallback === 'function' ){
                    successCallback(body.isLightOn);
                }
            }else{
                if (errorCallback && typeof errorCallback === 'function'){
                    errorCallback(Constant.Error.CouchDB.read);
                }else{
                    throw (Constant.Error.CouchDB.read);
                }
            }
        }
    }
}
module.exports = Light;
