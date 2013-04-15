/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 14:05
 */
define(function(){
   return CONSTANT = {
       PORT : 3000,
       DOMAIN : 'localhost',

       WAMP : {
           SESSION : {
               DEFAULT : null
           }
       },

       COMPONENT_SPEC : {

           DEFAULT : {
               SWITCH_MODE : {
                   ON_OFF : 'onoff',
                   DIAL : 'dial'
               },
               DIAL : {
                   STRENGTH : ( 0 % 100 ) / 100
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
       }
   };
});