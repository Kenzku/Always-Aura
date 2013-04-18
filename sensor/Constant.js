/**
 * A: Ken
 * Date: 02/04/2013
 * Time: 16:26
 */

exports.EventFireMode = {
    fixedInterval : "fixedinterval",
    valueChange : "valuechange"
}

exports.ReturnAble = {
    true : true,
    false : false
}

exports.CancelAble = {
    true : true,
    false : false
}

exports.EventType = {
    nothing : "nothing",
    sensor : "sensor",
    actuator : "actuator"
}

exports.State = {
    original : 0
}

exports.room = {
    id : '8361e3dfb52f0e28784c3cb534010c8f',
    isLightOn : null,
    topURI : {
        lightStatus : 'room:lightStatus'
    },
    subscribe : {
        lightStatus : 'Light Status'
    }
}

exports.ComponentSpec = {
    default : {
        data: null,
        did : "",
        tags : null,
        ts : null,
        timeout : 100.0,
        rate : 50.0,
        hardware : null,
        config : null,
        switchMode : {
            onoff : 'onoff',
            dial : 'dial'
        },
        dial : {
            strength : ( 0 % 100 ) / 100
        },
        switch : {
            on : true,
            off : false
        }
    },
    cid : {
        temperature: 0,
        humidity : 1,
        pressure : 2,
        location : 3,
        accelerometer : 4,
        multimedia : 5
    },
    type : {
        default : "",
        sensor : {
            temperature: 'temperature',
            humidity : 'humidity',
            pressure : 'pressure',
            location : 'location',
            accelerometer : 'accelerometer',
            multimedia : 'multimedia'
        },
        actuator : {
            switch : 'switch'
        }
    }
}

exports.Error = {
    reset : {
        NO_INIT : 'You can\'t initialise, because the sensor hasn\'t been initialised.'
    },
    init : {
        type : {
            UNKNOWN : 'Unknown component type'
        }
    },
    CouchDB : {
        read : 'read document error',
        update : 'update document error',
        save : 'save document error'
    },
    LightActuator : {
        room : 'no room id'
    }
}

exports.GeoPosition = function () {
    var latitude = 0.0;
    var longitude = 0.0;
    return {latitude:latitude,longitude:longitude};
}