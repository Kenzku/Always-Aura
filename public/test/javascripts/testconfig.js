/**
 * Author: Ken
 * Date: 15/04/2013
 * Time: 23:10
 */
require.config({
    paths: {
        'roomwithswitchtest' : '/test/javascripts/roomwithswitchtest',
        'lighttest' : '/test/javascripts/lighttest',
        'lightactuatortest' : '/test/javascripts/lightActuatorAPITest'
    }
});
QUnit.config.autostart = false;
require(['roomwithswitchtest','lighttest','lightactuatortest'], function (roomwithswitchtest,lighttest,lightactuatortest) {
        QUnit.start();
        roomwithswitchtest.RunTests();
        lighttest.RunTests();
        lightactuatortest.RunTests();
    }
);
