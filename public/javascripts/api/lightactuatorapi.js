/**
 * Author: Ken
 * Date: 10/04/2013
 * Time: 14:52
 */

function initActuator(session,type,config,callback) {
    var args = config && typeof config == 'object' ?
        [type,config] :
        [type];

    if (callback && typeof callback === 'function'){
        successCB.callback = callback;
    }
    session.call('component:init',args).then(successCB);

    /**
     * RPC success callback
     * @param res the data that the server transfer
     */
    function successCB (res){
        successCB.callback(res);
    }
}
/**
 * reset sensor state
 * @param callback success callback
 * with the returned data as its parameter
 */
function resetActuator(session,callback) {
    if (callback && typeof callback === 'function'){
        successCB.callback = callback;
    }
    session.call('component:reset').then(successCB);

    /**
     * RPC success callback
     * @param res the data that the server transfer
     */
    function successCB (res){
        successCB.callback(res);
    }
}