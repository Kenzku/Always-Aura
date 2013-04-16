/**
 * Author: Ken
 * Date: 16/04/2013
 * Time: 17:19
 */
require.config({
    paths: {
        'light' : '/javascripts/light'
    }
});
require(['light'],function(){
    var aLight = new Light();
    aLight.init(successCB_1,errorCB);

    function successCB_1(){
        aLight.lightStatus(onLightStatusChange,successCB_2,errorCB);
    }

    function successCB_2(lightStatus){
        console.log(lightStatus);
    }
    function errorCB (error){
        console.log(error);
    }
    function onLightStatusChange(data) {
        aLight.updateLightUI(data);
    }
});