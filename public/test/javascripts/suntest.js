/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 15:39
 */
define(['../../javascripts/sun.js'],function(Sun){
    return {
        RunTest : function () {
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
        }
    }
});