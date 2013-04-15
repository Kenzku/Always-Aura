/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 13:31
 */
module('Room');
asyncTest('Enter the room',function(){
    function successCB(sess){
        equal(sess instanceof ab.Session,true);
        equal(sess._websocket.protocol,"wamp");
        start();
    }

    function errorCB (err) {
        console.log(err);
        ok(true);
        start();
    }

    var room = new Room();
    room.comeIn(successCB,errorCB);
});

asyncTest('Switch the Light',function(){
    // enter the room callbacks
    function successCB_1 (sess){
        ok(true);
        room.switchLight(onSwitchedLight,successCB_2,errorCB_2);
    }

    function errorCB_1 (err) {
        console.log(err);
        ok(true);
        start();
    }

    // switch light callback
    function successCB_2 (data){
        ok(true);
        start();
    }

    function errorCB_2 (err) {
        console.log(err);
        ok(true);
        start();
    }

    function onSwitchedLight(topicUri, data) {
        console.log(data);
        console.log(topicUri);
        start();
    }

    var room = new Room();
    room.comeIn(successCB_1,errorCB_1);
});