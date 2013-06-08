/**
 * Author: Ken
 * Date: 15/04/2013
 * Time: 23:10
 */
require.config({
    paths: {
        'roomtest' : '/test/javascripts/roomtest',
        'lighttest' : '/test/javascripts/lighttest',
        'lightactuatortest' : '/test/javascripts/lightActuatorAPITest',
        'suntest' : '/test/javascripts/suntest'
    }
});
QUnit.config.autostart = false;
require(['roomtest','lighttest','lightactuatortest','suntest'], function (roomtest,lighttest,lightactuatortest,suntest) {
        QUnit.start();
        // run one by one
//        roomtest.RunTests();
        lighttest.RunTests();
//        lightactuatortest.RunTests();
//        suntest.RunTests();
    }
);
