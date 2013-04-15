/**
 * Author: Ken
 * Date: 15/04/2013
 * Time: 23:10
 */
require.config({
    paths: {
        'roomtest': '/test/javascripts/roomtest'
    }
});
QUnit.config.autostart = false;
require(['roomtest'], function (roomtest) {
        QUnit.start();
        roomtest.RunTests();
    }
);
