/**
 * Author: Ken
 * Date: 16/04/2013
 * Time: 10:53
 */
var assert = require("assert")
  , Constant = require('../sensor/Constant')
  , express = require('express')
  , chai = require('chai')
  , CouchDB = require('../db/CouchDB');

//mocha ./test/CouchDBTest.js -R spec -u qunit -t 10000 -g CouchDB
suite('CouchDB');
test('CouchDB - documents - readDocument',function(done){
    var aCouchDB = new CouchDB('room');

    aCouchDB.readDocument(Constant.room.id, successCB, errorCB);

    // success callback to aCouchDB.readDocument
    function successCB (body){
        // behaviour test
        chai.expect(body).to.be.an('object');
        chai.expect(body).to.include.keys('_id');
        chai.expect(body).to.include.keys('_rev');
        chai.expect(body).to.include.keys('isLightOn');

        // value LOOSE test in general
        chai.expect(body.isLightOn).to.be.a('boolean');
        done();
    }

    // error callback to aCouchDB.saveDocument and aCouchDB.readDocument
    function errorCB (err){
        console.log("Error: " + err);
        assert.ok(false, err);
        done();
    }
});

test('CouchDB - documents - saveDocument then readDocument',function(done){
    var aCouchDB = new CouchDB('room');

    var doc = {
        type : 'test',
        isLightOn: false
    }
    aCouchDB.saveDocument(doc,successCB_1,errorCB);

    // success callback to aCouchDB.saveDocument
    function successCB_1 (body){
        // test the return body
        chai.expect(body).to.be.an('object');
        chai.expect(body).to.include.keys('id');
        chai.expect(body).to.include.keys('rev');
        chai.expect(body).to.include.keys('ok');
        chai.expect(body.ok).to.be.true;

        // test if the saved document valid in general
        var id = body.id;
        aCouchDB.readDocument(body.id, successCB_1_1, errorCB);

        // success callback to aCouchDB.readDocument
        function successCB_1_1 (body){
            // behaviour test
            chai.expect(body).to.be.an('object');
            chai.expect(body).to.include.keys('_id');
            chai.expect(body).to.include.keys('_rev');
            chai.expect(body).to.include.keys('type');
            chai.expect(body).to.include.keys('isLightOn');

            // value LOOSE test in general
            chai.expect(body.type).to.be.a('string');
            chai.expect(body.type).to.equal('test');
            chai.expect(body.isLightOn).to.be.a('boolean');
            done();
        }
    }

    // error callback to aCouchDB.saveDocument and aCouchDB.readDocument
    function errorCB (err){
        console.log("Error: " + err);
        assert.ok(false,err);
        done();
    }
});

test('CouchDB - documents - updateDocument then readDocument', function(done){
    var aCouchDB = new CouchDB('room');
    aCouchDB.updateDocument(Constant.room.id,'isLightOn',{isLightOn:true},successCB_1,errorCB);

    function successCB_1 (body){
        // test the return body
        chai.expect(body).to.be.an('object');
        chai.expect(body).to.include.keys('id');
        chai.expect(body).to.include.keys('rev');
        chai.expect(body).to.include.keys('ok');
        chai.expect(body.ok).to.be.true;

        // test if the saved document valid in general
        var id = body.id;
        aCouchDB.readDocument(body.id, successCB_1_1, errorCB);

        // success callback to aCouchDB.readDocument
        function successCB_1_1 (body){
            // behaviour test
            chai.expect(body).to.be.an('object');
            chai.expect(body).to.include.keys('_id');
            chai.expect(body).to.include.keys('_rev');
            chai.expect(body).to.include.keys('isLightOn');

            // value LOOSE test in general
            chai.expect(body.isLightOn).to.be.a('boolean');
            chai.expect(body.isLightOn).to.equal(true);
            aCouchDB.updateDocument(Constant.room.id,'isLightOn',{isLightOn:false},successCB_1_2,errorCB);
        }
    }
    // change the isLight on Back
    function successCB_1_2 (body) {
        done();
    }
    function errorCB(err){
        console.log("Error: " + err);
        assert.ok(false,err);
        done();
    }
});