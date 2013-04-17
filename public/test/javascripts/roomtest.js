/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 13:31
 */
define(['../../javascripts/room.js','../../javascripts/Constant.js'],function (Room) {
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
                        console.log("rpcSuccessCB_2: " + data);
                        ok(true);
                    }

                    function errorCB_2 (err) {
                        console.log(err);
                        ok(false);
                        start();
                    }

                    function successCB_3 (topicUri, data){
                        console.log("successCB_3: " + data);
                        console.log("successCB_3: " + topicUri);
                        ok(true);
                        start();
                    }

                    function onSwitchedLight(topicUri, data) {
                        console.log("onSwitchedLight: " + data);
                        console.log("onSwitchedLight: " + topicUri);
                        ok(true);
                        start();
                    }

                    var room = new Room();
                    room.comeIn(successCB_1,errorCB_1);
                });
            }
        }
    }
);