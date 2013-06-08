/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 13:21
 */
/*global define*/
define(['jquery',
        '../javascripts/api/lightactuatorapi.js',
        '../javascripts/initwamp.js',
        '../javascripts/Constant.js'], function ($, LightActuatorAPI, init, CONSTANT) {
    "use strict";
    function Sun() {
        var self = this;

        self.sess = null;

        self.init = function (successCallback, errorCallback) {
            // call on WAMP connection successfully establish
            function successCB(session) {
                self.sess = session;
                self.sess.prefix("room", "http://" + CONSTANT.DOMAIN + ":" + CONSTANT.PORT +  "/room#");
                self.sess.prefix("sun", "http://" + CONSTANT.DOMAIN + ":" + CONSTANT.PORT +  "/sun#");
                if (successCallback && typeof successCallback === 'function') {
                    successCallback(session);
                }
            }
            // call on WAMP connection failed on establish
            function errorCB(error) {
                if (errorCallback && typeof errorCallback === 'function') {
                    errorCallback(error);
                } else {
                    throw error;
                }
            }
            // init WAMP connection
            init(successCB, errorCB);
        };
        /*jslint todo: true */ // because the  words 'to do' is fired by its programme bugs
        /**
         * start sunrise and sunset simulation.
         * to do this, you need to call start and configuration if needed.
         * Without Sun initialisation, the publish event in sunRise(sunBurst) and
         * sunSet(sunBurst) will not work.
         * @constructor
         */
        /*jslint todo: false */
        self.SunPeriod = function () {
            /*jslint nomen: true*/
            var _self = this;

            // sun period settings
            _self.isContinued = CONSTANT.SUN.IS_CONTINUED;
            _self.timeInterval = CONSTANT.SUN.TIME_INTERVAL;
            _self.isSunRise = CONSTANT.SUN.IS_SUN_RISE;

            /**
             * start the sun period
             * @param callback (sunBurst) current sun burst in Integer [0,9)
             */
            _self.start = function (callback) {
                var sunPeriodInterval;
                function loop() {
                    // change opacity
                    var sunBurst = Math.abs($('.sunburst b').css('opacity'));

                    // make sure sunBurst is in range
                    sunBurst = _self.sunBurstConverter(sunBurst);

                    if (_self.isSunRise) {
                        _self.sunRise(sunBurst);
                    } else {
                        _self.sunSet(sunBurst);
                    }
                    if (callback && typeof callback === 'function') {
                        callback(_self.sunBurstConverter(sunBurst));
                    }
                    if (!_self.isContinued) {
                        clearInterval(sunPeriodInterval);
                    }
                }
                sunPeriodInterval = setInterval(loop, _self.timeInterval);
            }
            /**
             * simulate sunrise under element '.sunburst b'
             * @param sunBurst {Integer} an integer [0,9)
             */
            _self.sunRise = function (sunBurst) {
                if (sunBurst < 9 && sunBurst >= 0) {
                    var _sunBurst = (sunBurst + 1.5) / 10;
                    $('.sunburst b').css('opacity', _sunBurst);
                    if (self.sess){
                        _self.adjust(self.sess,_self.lightBrightnessConverter(_sunBurst));

                    }
                } else if (sunBurst == 9 ) {
                    _self.isSunRise = CONSTANT.SUN.SUN_SET;
                } else {
                    $('.sunburst b').css('opacity', 1);
                }
            }
            /**
             * simulate sunrise under element '.sunburst b'
             * @param sunBurst {Integer} an integer [0,9)
             */
            _self.sunSet = function (sunBurst) {
                if (sunBurst <= 10 && sunBurst > 0) {
                    var _sunBurst = ( sunBurst - 1 )/ 10;
                    $('.sunburst b').css('opacity', _sunBurst);
                    if (self.sess){
                        _self.adjust(self.sess,_self.lightBrightnessConverter(_sunBurst));

                    }
                }else if (sunBurst == 0 ) {
                    _self.isSunRise = CONSTANT.SUN.SUN_RISE;
                } else {
                    $('.sunburst b').css('opacity', 0);
                }
            /*jslint nomen: false*/
            }

            /**
             * Configure a sun period
             * @param options
             */
            _self.config = function (options) {
                for (var option in options){
                    switch (option) {
                        case "isContinued":
                            _self.isContinued = typeof options[option] == 'boolean' ?
                                options[option] : CONSTANT.SUN.IS_CONTINUED;
                            break;
                        case "timeInterval":
                            _self.timeInterval = typeof options[option] == 'number' ?
                                options[option] : CONSTANT.SUN.TIME_INTERVAL;
                            break;
                        case "isSunRise":
                            _self.isSunRise = typeof options[option] == 'boolean' ?
                                options[option] : CONSTANT.SUN.IS_SUN_RISE;
                            break;
                    }
                }
            }

            /**
             * convert the opacity of element '.sunburst b' into
             * the value that sunRise(sunBurst) and sunSet(sunBurst)
             * can use
             * @param sunBurst [0,1] in the simulation,
             * it is the opacity of element '.sunburst b'
             * @returns {Integer} the value that sunRise(sunBurst) and sunSet(sunBurst)
             * can use
             */
            _self.sunBurstConverter = function (sunBurst) {
                if (sunBurst > 0 && sunBurst < 1) {
                    sunBurst = parseInt(sunBurst * 10);
                } else if (sunBurst == 1){
                    sunBurst = 10;
                } else if (sunBurst == 0){
                    sunBurst = 0;
                } else {
                    sunBurst = parseInt(sunBurst % 10);
                }
                return sunBurst;
            }

            /**
             * convert sun burst brightness into light brightness
             * @param sunBurst [0,1] in the simulation,
             * it is the opacity of element '.sunburst b'
             * @returns {number} the brightness value that the light can use [0,30]
             */
            _self.lightBrightnessConverter = function (sunBurst) {
                sunBurst = 30 - (sunBurst * 30);
                return sunBurst;
            }

            /**
             * reset a sun period
             */
            _self.reset = function () {
                _self.isContinued = CONSTANT.SUN.IS_CONTINUED;
                _self.timeInterval = CONSTANT.SUN.TIME_INTERVAL;
                _self.isSunRise = CONSTANT.SUN.IS_SUN_RISE;

                _self.aLightActuatorAPI = new LightActuatorAPI();
            }

            /**
             * adjust the light's brightness,
             * without changing the the state in CouchDB.
             * The purpose is for simulation
             * @param session {Object} WAMP session
             * @param data {Number} the brightness value that the light can use [0,30]
             */
            _self.adjust = function(session, data){
                session.publish(CONSTANT.WAMP.TOPIC.SUN,
                    {
                        'turnLightTo': data
                    },
                    true);
            }
        }
    }
    return Sun;
});