/**
 * Author: Ken
 * Date: 24/04/2013
 * Time: 10:04
 */
require.config({
    paths: {
        'sun' : '/javascripts/sun'
    }
});

require(['sun'],function(Sun){
    var theSun = new Sun();

    theSun.init(successCB,errorCB);

    function successCB(session) {
        var aSunPeriod = new theSun.SunPeriod();
        aSunPeriod.start();
    }
    function errorCB (err) {
        console.log(err);
    }
});