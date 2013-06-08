/**
 * Author: Ken
 * Date: 16/04/2013
 * Time: 20:24
 */
/*global define, asyncTest, deepEqual, start, ok, equal*/
define(['../../javascripts/light.js'], function (Light) {
    "use strict";
    return {
        RunTests : function () {
            module('Light Status');

            /**
             * separate two parts,
             * because `onLightStatusChange` in `init` and
             * `successCB_2` in `aLight.lightStatus`
             * are timing conflicted
             */
            asyncTest('check the light in the room status - 1', function () {
                var aLight = new Light();
                function successCB_2(lightStatus) {
                    equal(typeof lightStatus, 'object');
                    equal(typeof lightStatus.isLightOn, 'boolean');
                    equal(lightStatus.strength >= 0 && lightStatus.strength <= 100, true);
                    start();
                }
                function errorCB(error) {
                    ok(false, error);
                    start();
                }
                function successCB_1() {
                    aLight.lightStatus(successCB_2, errorCB);
                }
                function onLightStatusChange(topic, event) {
                    // nothing here
                }
                aLight.init(onLightStatusChange, null, successCB_1, errorCB);
            });

            asyncTest('check the light in the room status - 2', function () {
                var aLight = new Light();
                function errorCB(error) {
                    ok(false, error);
//                    start();
                }
                function successCB_1() {
                    aLight.lightStatus(null, errorCB);
                }
                function onLightStatusChange(topic, event) {
                    equal(Object.prototype.toString.call(event), '[object Array]');
                    if (event[0] === 'message') {
                        /**
                         * because for protocol reason,
                         * this will also receive the first establish message
                         */
                        ok(true);
                    } else {
                        equal(event[0], 'Light Status');
                    }
//                    start();
                }
                aLight.init(onLightStatusChange, null, successCB_1, errorCB);
            });

            asyncTest('check the light in the room status - 3', function () {
                var aLight = new Light();
                function errorCB(error) {
                    ok(false, error);
                    start();
                }
                function successCB_1() {
                    aLight.lightStatus(null, errorCB);
                }
                function onSunStatusChange(topic, event) {
                    equal(Object.prototype.toString.call(event), '[object Array]');
                    if (event[0] === 'message') {
                        /**
                         * because for protocol reason,
                         * this will also receive the first establish message
                         */
                        ok(true);
                    } else {
                        equal(event[0], 'Light Status');
                    }
                    start();
                }

                function onLightStatusChange(topic, event) {
                    // nothing here
                }
                aLight.init(onLightStatusChange, onSunStatusChange, successCB_1, errorCB);
            });
        }
    };
});