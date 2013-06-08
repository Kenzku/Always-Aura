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
    aLight.init(onLightStatusChange,null,successCB_1,errorCB);

    function successCB_1(){
        aLight.lightStatus(successCB_2,errorCB);
    }
    // lightStatus: {isLightOn: Boolean, strength: Number}
    function successCB_2(lightStatus){
        aLight.updateLightUI(lightStatus.isLightOn);
        if (lightStatus.isLightOn){
            // light on
            aLight.senseSun(onSunStatusChange);
        }
    }
    function errorCB (error){
        console.log(error);
    }
    function onLightStatusChange(topic, event) {
        if (topic == CONSTANT.WAMP.TOPIC.LIGHT_STATUS &&
            Object.prototype.toString.call(event) == '[object Array]' &&
            event.length == 4){

            if(typeof event[2].turnLightTo === 'boolean'){

                aLight.currentLightStatus = event[2].turnLightTo;
                console.log('onLightStatusChange: ' + aLight.currentLightStatus);

                if(aLight.currentLightStatus){
                    // light on
                    console.log('sub');
                    aLight.senseSun(onSunStatusChange);
                }else{
                    console.log('unsub');
                    aLight.doNotSenseSun();
                }
            }

            aLight.updateLightUI(event[2].turnLightTo);
        }
    }
    function onSunStatusChange(topic, event) {
        if (topic == CONSTANT.WAMP.TOPIC.SUN &&
            Object.prototype.toString.call(event) == '[object Array]' &&
            event.length == 4){
            console.log(aLight.currentLightStatus);
            if(aLight.currentLightStatus){
                aLight.updateLightUI(event[2].turnLightTo);
            }
        }
    }

});