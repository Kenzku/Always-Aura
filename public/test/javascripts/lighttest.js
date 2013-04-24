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

                function successCB_2(lightStatus){
                    equal(typeof lightStatus, 'object');
                    equal(typeof lightStatus.isLightOn, 'boolean');
                    equal(lightStatus.strength >= 0 && lightStatus.strength <= 100, true);
                    start();
                }
                function errorCB (error){
                    ok(false,error);
                    start();
                }
                function onLightStatusChange (topic, event){
                    equal(Object.prototype.toString.call(event),'[object Array]');
                    if (event[0] == 'message'){
                        /**
                         * because for protocol reason,
                         * this will also receive the first establish message
                         */
                        ok(true);
                    }else{
                        equal(event[0],'Light Status');
                    }
                }
            });
        }
    };
});