/**
 * Author: Ken
 * Date: 16/04/2013
 * Time: 17:19
 */
require.config({
    paths: {
        'light' : '/javascripts/light',
        'constant' : '/javascripts/Constant'
    }
});
require(['light','constant'],function(Light,CONSTANT){
    var aLight = new Light();
    aLight.init(onLightStatusChange,successCB_1,errorCB);

    function successCB_1(){
        aLight.lightStatus(successCB_2,errorCB);
    }

    function successCB_2(lightStatus){
        aLight.updateLightUI(lightStatus);
    }
    function errorCB (error){
        console.log(error);
    }
    function onLightStatusChange(topic, event) {
        if (topic == CONSTANT.WAMP.TOPIC.LIGHT_STATUS &&
            Object.prototype.toString.call(event) == '[object Array]' &&
            event.length == 4){
            aLight.updateLightUI(event[2].turnLightTo);
        }
    }
});