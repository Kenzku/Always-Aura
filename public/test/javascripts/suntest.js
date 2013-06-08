/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 15:39
 */
/*global define, asyncTest, deepEqual, start, ok, equal, test*/
define(['jqeury',
        '../../javascripts/sun.js',
        '../../javascripts/Constant.js',
        '../../javascripts/autobahn.js'], function ($, Sun, CONSTANT, ab) {
    "use strict";
    return {
        RunTests : function () {
            module('Sun');

            asyncTest('init', function () {
                var theSun = new Sun();
                function successCB(session) {
                    equal(session instanceof ab.Session, true);
                    /*jslint nomen: true*/
                    equal(session._websocket.protocol, "wamp");
                    /*jslint nomen: false*/
                    start();
                }
                function errorCB(err) {
                    ok(false, err);
                    start();
                }
                theSun.init(successCB, errorCB);
            });

            module('Sun Period');
            test('sun rise', function () {
                var i,
                    sunBurst,
                    sunBurst_new,
                    theSun = new Sun(),
                    aSunPeriod = new theSun.SunPeriod();

                $('.sunburst b').css('opacity', 0);
                // NOTE : the 9th time should go to sunset, so here set to 8
                for (i = 0; i < 8; i += 1) {
                    sunBurst = Math.abs($('.sunburst b').css('opacity'));

                    // make sure sunBurst is in range
                    sunBurst = aSunPeriod.sunBurstConverter(sunBurst);

                    // sun rise
                    aSunPeriod.sunRise(sunBurst);

                    // current sunburst
                    sunBurst_new = Math.abs($('.sunburst b').css('opacity'));

                    sunBurst_new = aSunPeriod.sunBurstConverter(sunBurst_new);
                    sunBurst = aSunPeriod.sunBurstConverter(sunBurst);
                    equal(sunBurst < sunBurst_new, true);
                }

            });

            test('sun set', function () {
                var i,
                    sunBurst,
                    sunBurst_new,
                    theSun = new Sun(),
                    aSunPeriod = new theSun.SunPeriod();

                $('.sunburst b').css('opacity', 1);
                for (i = 0; i < 8; i += 1) {
                    sunBurst = Math.abs($('.sunburst b').css('opacity'));

                    // make sure sunBurst is in range
                    sunBurst = aSunPeriod.sunBurstConverter(sunBurst);
                    // sun rise
                    aSunPeriod.sunSet(sunBurst);

                    // current sunburst
                    sunBurst_new = Math.abs($('.sunburst b').css('opacity'));

                    sunBurst_new = aSunPeriod.sunBurstConverter(sunBurst_new);
                    sunBurst = aSunPeriod.sunBurstConverter(sunBurst);
                    equal(sunBurst > sunBurst_new, true);
                }
            });

            test('sun config - 1', function () {
                var options,
                    theSun = new Sun(),
                    aSunPeriod = new theSun.SunPeriod();

                equal(aSunPeriod.isContinued, true);
                equal(aSunPeriod.timeInterval, 800);
                equal(aSunPeriod.isSunRise, true);

                options = {
                    isContinued : false,
                    timeInterval : 100,
                    isSunRise : false
                };

                aSunPeriod.config(options);

                equal(aSunPeriod.isContinued, false);
                equal(aSunPeriod.timeInterval, 100);
                equal(aSunPeriod.isSunRise, false);

                aSunPeriod.reset();

                equal(aSunPeriod.isContinued, CONSTANT.SUN.IS_CONTINUED);
                equal(aSunPeriod.timeInterval, CONSTANT.SUN.TIME_INTERVAL);
                equal(aSunPeriod.isSunRise, CONSTANT.SUN.IS_SUN_RISE);
            });

            test('sun config - 2', function () {
                var options,
                    theSun = new Sun(),
                    aSunPeriod = new theSun.SunPeriod();

                equal(aSunPeriod.isContinued, true);
                equal(aSunPeriod.timeInterval, 800);
                equal(aSunPeriod.isSunRise, true);

                options = {
                    isContinued : false,
                    isSunRise : true
                };

                aSunPeriod.config(options);

                equal(aSunPeriod.isContinued, false);
                equal(aSunPeriod.timeInterval, 800); // should not change
                equal(aSunPeriod.isSunRise, true);

                aSunPeriod.reset();

                equal(aSunPeriod.isContinued, CONSTANT.SUN.IS_CONTINUED);
                equal(aSunPeriod.timeInterval, CONSTANT.SUN.TIME_INTERVAL);
                equal(aSunPeriod.isSunRise, CONSTANT.SUN.IS_SUN_RISE);
            });

            asyncTest('sun start', function () {
                var options,
                    theSun = new Sun(),
                    aSunPeriod = new theSun.SunPeriod(),
                    counter = 8,
                    loop_counter = 0;
                function callback(sunBurst) {
                    if (counter === 0) {
                        aSunPeriod.isContinued = false;
                        equal(loop_counter, 8);
                        start();
                    }
                    counter -= 1;
                    loop_counter += 1;
                }

                options = {
                    timeInterval : 100
                };
                // just make it faster
                aSunPeriod.config(options);

                aSunPeriod.start(callback);
            });
        }
    };
});