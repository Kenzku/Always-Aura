/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 10:00
 */
var Light = require('../sensor/Light');
var Constant = require('../sensor/Constant');
var expect = require('chai').expect;
var assert = require('assert');

// mocha ./test/LightTest.js -R spec -u qunit
suite('Light');
test('Light - check light status',function(done){
    var aLight = new Light();

    aLight.checkLightState(Constant.room.id,successCB,errorCB);

    function successCB (currentStatus){
        expect(currentStatus).to.be.a('boolean');
        done();
    }

    function errorCB (err) {
        assert.ok(false,err);
        done();
    }
});