/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 14:05
 */
/*global define*/
define(function () {
    "use strict";
    return {
        PORT : 3000,
        DOMAIN : 'localhost',

        WAMP : {
            SESSION : {
                DEFAULT : null
            },
            TOPIC : {
                LIGHT_STATUS : 'room:lightStatus',
                SWITCH_LIGHT : 'actuator:switchLight',
                SUN : 'sun:sunBrightness'
            }
        },

        COMPONENT_SPEC : {

            DEFAULT : {
                SWITCH_MODE : {
                    ON_OFF : 'onoff',
                    DIMMER : 'dimmer'
                },
                DIMMER : {
                    STRENGTH : 0 // (STRENGTH % 100) / 100
                },
                SWITCH : {
                    ON : true,
                    OFF : false
                }
            },
            CID : {
                TEMPERATURE: 0,
                HUMIDITY : 1,
                PRESSURE : 2,
                LOCATION : 3,
                ACCELEROMETER : 4,
                MULTIMEDIA : 5
            },
            TYPE : {
                DEFAULT : "",
                SENSOR : {
                    TEMPERATURE: 'temperature',
                    HUMIDITY : 'humidity',
                    PRESSURE : 'pressure',
                    LOCATION : 'location',
                    ACCELEROMETER : 'accelerometer',
                    MULTIMEDIA : 'multimedia'
                },
                ACTUATOR : {
                    SWITCH : 'switch'
                }
            }
        },

        SUN : {
            IS_CONTINUED : true,
            TIME_INTERVAL : 800,
            IS_SUN_RISE : true,
            SUN_RISE : true,
            SUN_SET : false
        },

        ERROR : {
            LIGHT : {
                LIGHT_STATUS : 'Haven\'t init the light'
            }
        }
    };
});