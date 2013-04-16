/**
 * Author: Ken
 * Date: 16/04/2013
 * Time: 20:24
 */
define(['../../javascripts/light.js'],function(Light){
    return {
        RunTests : function(){
            module('Light Status');

            asyncTest('check the light in the room status',function(){
                var aLight = new Light();
                aLight.init(onLightStatusChange,successCB_1,errorCB);

                function successCB_1(){
                    aLight.lightStatus(successCB_2,errorCB);
                }

                function successCB_2(LightStatus){
                    console.log("LightStatus is : " + LightStatus);
                    ok(true);
                    start();
                }
                function errorCB (error){
                    console.log(error);
                    ok(false);
                    start();
                }
                function onLightStatusChange (data){
                    console.log(data);
                }
            });
        }
    };
});