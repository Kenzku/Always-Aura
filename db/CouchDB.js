/**
 * User: Ken
 * Date: 08/04/2013
 * Time: 14:40
 */
var nano = require('nano')('http://iot.cs.hut.fi:5984');

function CouchDB (database) {
    var db = nano.use(database);
    var self = this;

    self.readDocument = function (id,successfulCallback,errorCallback) {
        db.get(id, function(err, body) {
            if (err) {
                errorCallback(err);
            }
            else {
                successfulCallback(body);
            }
        });
    }
}

module.exports = CouchDB;