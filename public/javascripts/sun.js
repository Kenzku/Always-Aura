/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 13:21
 */
define(['../javascripts/api/lightactuatorapi.js',
    '../javascripts/initwamp.js',
    '../javascripts/Constant.js'],function(LightActuatorAPI,init,CONSTANT){
    return Sun;
});

function Sun(){
    var self = this;

    self.sess = null;

    // sun period settings
    self.isContinue = true;
    self.timeInterval = 800;
    self.isSunrise = true;


    self.init = function (successCallback, errorCallback) {
        // init WAMP connection
        init(successCB,errorCB);

        // call on WAMP connection successfully establish
        function successCB(session){
            self.sess = session;
            self.sess.prefix("room", "http://"+CONSTANT.DOMAIN + ":" + CONSTANT.PORT +  "/room#");
            if (successCallback && typeof successCallback === 'function'){
                successCallback (session);
            }
        }
        // call on WAMP connection failed on establish
        function errorCB(error){
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(error);
            }else{
                throw error;
            }
        }
    }

    self.sunPeriod = function () {

        var sunPeriodInterval = setInterval(loop,self.timeInterval);

        function loop() {
            // change opacity
            var sunBurst = Math.abs($('.sunburst b').css('opacity'));

            if (sunBurst > 0 && sunBurst < 1){
                sunBurst = parseInt(sunBurst * 10);
            }else{
                sunBurst = parseInt(sunBurst % 10);
            }

            // sunrise
            if (self.isSunrise) {
                if (sunBurst < 9 && sunBurst >= 0) {
                    var _sunBurst = (sunBurst + 1.5) / 10;
                    $('.sunburst b').css('opacity', _sunBurst);
                } else if (sunBurst == 9 ) {
                    self.isSunrise = false;
                } else {
                    $('.sunburst b').css('opacity', 1);
                }
            } else {
                if (sunBurst <= 10 && sunBurst > 0) {
                    var _sunBurst = ( sunBurst - 1.5 )/ 10;
                    $('.sunburst b').css('opacity', _sunBurst);
                } else if (sunBurst == 0 ) {
                    self.isSunrise = true;
                } else {
                    $('.sunburst b').css('opacity', 0);
                }
            }
            if (!self.isContinue) {
                clearInterval(sunPeriodInterval);
            }
        }
    }

}