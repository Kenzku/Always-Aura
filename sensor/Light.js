/**
 * Author: Ken
 * Date: 16/04/2013
 * Time: 21:21
 */
var CouchDB = require('../db/CouchDB');
var Constant = require('../sensor/Constant');

function Light() {
    "use strict";
    var self = this;
    /**
     * check light on/off status, this does not include strength value
     * @param roomId {String} the id of the room
     * @param successCallback (currentStatus) {boolean}
     * @param errorCallback (error)
     */
    self.checkLightState = function (roomId, successCallback, errorCallback) {
        if (!roomId || typeof roomId === 'function') {
            if (errorCallback && typeof errorCallback === 'function') {
                errorCallback(Constant.Error.LightActuator.room);
            } else {
                throw Constant.Error.LightActuator.room;
            }
        }
        var aCouchDB = new CouchDB('room');
        // success callback to aCouchDB.readDocument
        function successCB(body) {
            if (body && body.hasOwnProperty('isLightOn')) {
                if (successCallback && typeof successCallback === 'function') {
//                    successCallback(body.isLightOn);
                    successCallback(
                        {
                            isLightOn: body.isLightOn,
                            strength : body.strength
                        }
                    );
                }
            } else {
                if (errorCallback && typeof errorCallback === 'function') {
                    errorCallback(Constant.Error.CouchDB.read);
                } else {
                    throw (Constant.Error.CouchDB.read);
                }
            }
        }
        aCouchDB.readDocument(Constant.room.id, successCB, errorCallback);
    };
}
module.exports = Light;
