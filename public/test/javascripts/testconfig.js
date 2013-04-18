/**
 * Author: Ken
 * Date: 15/04/2013
 * Time: 23:10
 */
require.config({
    paths: {
        'roomtest' : '/test/javascripts/roomtest',
        'lighttest' : '/test/javascripts/lighttest',
        'lightactuatortest' : '/test/javascripts/lightActuatorAPITest'
    }
});
QUnit.config.autostart = false;
require(['roomtest','lighttest','lightactuatortest'], function (roomtest,lighttest,lightactuatortest) {
        QUnit.start();
//        roomtest.RunTests();
        lighttest.RunTests();
//        lightactuatortest.RunTests();
    }
);
