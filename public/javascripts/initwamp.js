/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 11:39
 */
/*global define, ab*/
define(function () {
    "use strict";
    function init(successCallback, errorCallback) {
        var PORT = "3000";
        // connect to WAMP server
        ab.connect("ws://localhost:" + PORT,

            // WAMP session was established
            function (session) {
                // {{ab.Session}} things to do once the session has been established
                console.log("Connected!");
                successCallback(session);
            },

            // WAMP session is gone: failure, closing, or brake-off
            function (code, reason) {
                // things to do once the session fails
                console.log(reason);
                errorCallback(reason);
            }
            );
    }
    return init;
});