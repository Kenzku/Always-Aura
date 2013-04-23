/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 13:31
 */
define(['../../javascripts/room.js','../../javascripts/Constant.js'],function (Room,CONSTANT) {
        return {
            RunTests: function () {
                module('Room');
                asyncTest('Enter the room',function(){
                    function successCB(sess){
                        equal(sess instanceof ab.Session,true);
                        equal(sess._websocket.protocol,"wamp");
                        start();
                    }

                    function errorCB (err) {
                        // if put assert here will cause error when exit the server
                        console.log(err);
                    }

                    var room = new Room();
                    room.comeIn(successCB,errorCB);
                });

                asyncTest('Switch the Light', function(){
                    // enter the room callbacks
                    function successCB_1 (sess){
                        ok(true);
                        room.switchLight(onSwitchedLight,rpcSuccessCB_2,errorCB_2);
                    }

                    function errorCB_1 (err) {
                        // if put assert here will cause error when exit the server
                        console.log(err);
                    }

                    // switch light callback
                    function rpcSuccessCB_2 (data){
                        equal(typeof data, 'boolean');
                    }

                    function errorCB_2 (err) {
                        console.log(err);
                        ok(false);
                        start();
                    }

                    function onSwitchedLight(topicUri, data) {
                        equal(Object.prototype.toString.call(data),'[object Array]');
                        equal(data[0],'Light Status');
                        equal(topicUri,CONSTANT.WAMP.TOPIC.LIGHT_STATUS)
                        start();
                    }

                    var room = new Room();
                    room.comeIn(successCB_1,errorCB_1);
                });

            }
        }
    }
);