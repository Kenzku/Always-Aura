/**
 * User: Ken
 * Date: 08/04/2013
 * Time: 14:40
 */
var nano = require('nano')('http://iot.cs.hut.fi:5984');
var Constant = require('../sensor/Constant');

function CouchDB (database) {
    var db = nano.use(database);
    var self = this;

    self.readDocument = function (id,successCallback,errorCallback) {
        db.get(id, function(err, body) {
            if (err) {
                if (errorCallback && typeof errorCallback === 'function'){
                    errorCallback(err);
                }else{
                    throw Constant.Error.CouchDB.read;
                }
            }
            else {
                if (successCallback && typeof successCallback === 'function'){
                    successCallback(body);
                }
            }
        });
    }

    self.updateDocument = function(id, field, doc, successCallback_1,errorCallback_1) {
        self.readDocument(id,successCallback_2,errorCallback_2);

        // success for read document
        function successCallback_2(body){
            var newDoc = body;
            if (field){
                if (doc.hasOwnProperty(field)) {
                    newDoc[field] = doc[field];
                }
            }else{
                for (var _field in doc) {
                    if (doc.hasOwnProperty(_field)) {
                        newDoc[_field] = doc[_field];
                    }
                }
            }
            self.saveDocument(newDoc, successCallback_1,errorCallback_1);
        }

        // error for read document
        function errorCallback_2 (err){
            if (errorCallback_2 && typeof errorCallback_2 === 'function'){
                errorCallback_2(err);
            }else{
                throw err;
            }
        }
    }

    self.saveDocument = function (doc,successCallback,errorCallback){
        // insert 'dataToSave' to CouchDB
        db.insert(doc,
            function (err,http_body,http_headers) {
                if(err) {
                    if (errorCallback && typeof errorCallback === 'function'){
                        errorCallback(err);
                    }else{
                        throw Constant.Error.CouchDB.save;
                    }
                }else{
                    /**
                     * body example:
                     * { ok: true,
                             *   id: '8361e3dfb52f0e28784c3cb5340055bd',
                             *   rev: '1-0d19569e40b9abc88b79e55d71a48bec' }
                     */
                    if (successCallback && typeof successCallback === 'function'){
                        successCallback(http_body);
                    }
                }
            }
        );
    }

}

module.exports = CouchDB;