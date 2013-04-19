/**
 * Author: Ken
 * Date: 17/04/2013
 * Time: 10:07
 */
require.config({
    paths: {
        'room' : '/javascripts/room'
    }
});
require(['room'],function(){
    var aRoom = new Room();

    aRoom.comeIn(successCB_1,errorCB_1);

    function successCB_1(sess){
        aRoom.switchUI(onSwitchedLight,rpcSuccessCB_2,errorCB_2);
        aRoom.adjustUI(onAdjustLight, rpcSuccessCB_2, errorCB_2);
    }
    function errorCB_1 (err) {
        console.log(err);
    }

    // switch light callback
    function rpcSuccessCB_2 (data){
        console.log("rpcSuccessCB_2: " + data);
    }

    function errorCB_2 (err) {
        console.log(err);
    }

    function successCB_3 (topicUri, data){
        console.log("successCB_3: " + data);
        console.log("successCB_3: " + topicUri);
    }

    function onSwitchedLight(topicUri, data) {
        console.log("onSwitchedLight: " + data);
        console.log("onSwitchedLight: " + topicUri);
    }
    function onAdjustLight(topicUri, data) {
        console.log("onSwitchedLight: " + data);
        console.log("onSwitchedLight: " + topicUri);
    }

});