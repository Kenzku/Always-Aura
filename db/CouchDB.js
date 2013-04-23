/**
 * User: Ken
 * Date: 08/04/2013
 * Time: 14:40
 */
var nano = require('nano')('http://iot.cs.hut.fi:5984');
var Constant = require('../sensor/Constant');

function CouchDB (database) {
    if (!database) {
        throw Constant.Error.CouchDB.database;
        return;
    }
    var db = nano.use(database);
    var self = this;
    /**
     * read documents from couchDB
     * @param id {String} document id
     * @param successCallback(body), called when read succeed
     * example body:
     * { _id: '8361e3dfb52f0e28784c3cb53404477a',
     * _rev: '35-f46481583c7fbda939ec2ba9ca79b381',
     * isLightOn: true,
     * strength: 60 }
     * @param errorCallback(error), called when read error
     */
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
    /**
     * update a filed of the document given by id, or
     * update the old document to the given document, by id, which means
     * it only updates those fields in the given documents
     * @param id {String} document id
     * @param field {String} one field in document to be updated.
     * if field appears, it only update this field
     * @param doc {Object} new document to be updated
     * @param successCallback(body)
     * @param errorCallback(err)
     */
    self.updateDocument = function(id, field, doc, successCallback,errorCallback) {
        self.readDocument(id,successCallback_1,errorCallback);

        // success for read document
        function successCallback_1(body){
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
            self.saveDocument(newDoc, successCallback, errorCallback);
        }
    }
    /**
     * save a document to the CouchDB
     * @param doc the document to save
     * @param successCallback(body)
     * @param errorCallback(err)
     */
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