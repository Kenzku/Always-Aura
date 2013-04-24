/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 15:39
 */
define(['../../javascripts/sun.js',
        '../../javascripts/Constant.js'],function(Sun,CONSTANT){
    return {
        RunTests : function () {
            module('Sun');

            asyncTest('init',function(){
                var theSun = new Sun();
                theSun.init(successCB,errorCB);

                function successCB(session) {
                    equal(session instanceof ab.Session,true);
                    equal(session._websocket.protocol,"wamp");
                    start();
                }
                function errorCB (err) {
                    ok(false,err);
                    start();
                }
            });

            module('Sun Period');
            test('sun rise',function(){
                var theSun = new Sun();
                var aSunPeriod = new theSun.SunPeriod();

                $('.sunburst b').css('opacity',0);
                // NOTE : the 9th time should go to sunset, so here set to 8
                for (var i = 0 ; i < 8 ; i ++) {
                    var sunBurst = Math.abs($('.sunburst b').css('opacity'));
                    var sunBurst_ori = sunBurst;

                    // make sure sunBurst is in range
                    sunBurst = aSunPeriod.sunBurstConverter(sunBurst);

                    // sun rise
                    aSunPeriod.sunRise(sunBurst);

                    // current sunburst
                    var sunBurst_new = Math.abs($('.sunburst b').css('opacity'));

                    sunBurst_new = aSunPeriod.sunBurstConverter(sunBurst_new);
                    sunBurst_ori = aSunPeriod.sunBurstConverter(sunBurst_ori);
                    equal(sunBurst_ori < sunBurst_new, true);
                }

            });

            test('sun set',function(){
                var theSun = new Sun();
                var aSunPeriod = new theSun.SunPeriod();

                $('.sunburst b').css('opacity',1);
                for (var i = 0 ; i < 8 ; i ++) {
                    var sunBurst = Math.abs($('.sunburst b').css('opacity'));

                    var sunBurst_ori = sunBurst;

                    // make sure sunBurst is in range
                    sunBurst = aSunPeriod.sunBurstConverter(sunBurst);
                    // sun rise
                    aSunPeriod.sunSet(sunBurst);

                    // current sunburst
                    var sunBurst_new = Math.abs($('.sunburst b').css('opacity'));

                    sunBurst_new = aSunPeriod.sunBurstConverter(sunBurst_new);
                    sunBurst_ori = aSunPeriod.sunBurstConverter(sunBurst_ori);
                    equal(sunBurst_ori > sunBurst_new, true);
                }
            });

            test('sun config - 1',function(){
                var theSun = new Sun();
                var aSunPeriod = new theSun.SunPeriod();

                equal(aSunPeriod.isContinued,true);
                equal(aSunPeriod.timeInterval,800);
                equal(aSunPeriod.isSunRise,true);

                var options = {
                    isContinued : false,
                    timeInterval : 100,
                    isSunRise : false
                };

                aSunPeriod.config(options);

                equal(aSunPeriod.isContinued,false);
                equal(aSunPeriod.timeInterval,100);
                equal(aSunPeriod.isSunRise,false);

                aSunPeriod.reset();

                equal(aSunPeriod.isContinued,CONSTANT.SUN.IS_CONTINUED);
                equal(aSunPeriod.timeInterval,CONSTANT.SUN.TIME_INTERVAL);
                equal(aSunPeriod.isSunRise,CONSTANT.SUN.IS_SUN_RISE);
            });

            test('sun config - 2',function(){
                var theSun = new Sun();
                var aSunPeriod = new theSun.SunPeriod();

                equal(aSunPeriod.isContinued,true);
                equal(aSunPeriod.timeInterval,800);
                equal(aSunPeriod.isSunRise,true);

                var options = {
                    isContinued : false,
                    isSunRise : true
                };

                aSunPeriod.config(options);

                equal(aSunPeriod.isContinued,false);
                equal(aSunPeriod.timeInterval,800); // should not change
                equal(aSunPeriod.isSunRise,true);

                aSunPeriod.reset();

                equal(aSunPeriod.isContinued,CONSTANT.SUN.IS_CONTINUED);
                equal(aSunPeriod.timeInterval,CONSTANT.SUN.TIME_INTERVAL);
                equal(aSunPeriod.isSunRise,CONSTANT.SUN.IS_SUN_RISE);
            });

            asyncTest('sun start',function(){
                var theSun = new Sun();
                var aSunPeriod = new theSun.SunPeriod();

                var options = {
                    timeInterval : 100
                };
                // just make it faster
                aSunPeriod.config(options);

                var counter = 8;
                var loop_counter = 0;
                aSunPeriod.start(callback);

                function callback(sunBurst){
                    if (counter == 0){
                        aSunPeriod.isContinued = false;
                        equal(loop_counter,8);
                        start();
                    }
                    counter--;
                    loop_counter++;
                }
            });
        }
    }
});