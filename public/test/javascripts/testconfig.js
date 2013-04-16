/**
 * Author: Ken
 * Date: 15/04/2013
 * Time: 23:10
 */
require.config({
    paths: {
        'roomtest' : '/test/javascripts/roomtest',
        'lighttest' : '/test/javascripts/lighttest'
    }
});
QUnit.config.autostart = false;
require(['roomtest','lighttest'], function (roomtest,lighttest) {
        QUnit.start();
        roomtest.RunTests();
//        lighttest.RunTests();
    }
);
