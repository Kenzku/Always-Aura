
/*!
 * wamp.io: a node.js WAMP™ server
 * Copyright (c) 2012 Nico Kaiser <nico@kaiser.me>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var EventEmitter = process.EventEmitter
  , handlers = require('./handlers')
  , protocol = require('./protocol')
  , debug = require('debug')('wamp');

/**
 * Module exports.
 */

module.exports = Server;

/**
 * Server constructor.
 *
 * @api public
 */

// when sending a message from a client -
// topics contain { 'event:firstevent': { 'client id': true } },
function Server(options) {
  this.options = options || {};
  this.topics = {};
  this.clients = {};
}

/**
 * Inherits from EventEmitter.
 */

Server.prototype.__proto__ = EventEmitter.prototype;

/**
 * Handle new connection
 *
 * @param {wsio.Socket} client
 * @return {Server} for chaining
 * @api public
 */

Server.prototype.onConnection = function(client) {
  var self = this;

  client.topics = {};
  client.prefixes = {};
  if (! client.id) client.id = String(Math.random() * Math.random()).substr(3);

  this.clients[client.id] = client;
    console.log("new connection --- wamp.io");
  debug('new connection');

  // Send welcome message
  var msg = [protocol.TYPE_ID_WELCOME, client.id, 1, 'wamp.io'];
  client.send(JSON.stringify(msg));

  client.on('message', function(data) {
    debug('message received: ' + data);
    console.log('message received: ' + data);

    try {
      var msg = JSON.parse(data);
    } catch (e) {
      debug('invalid json');
        console.log('invalid json');
      return;
    }

    if (! Array.isArray(msg)) {
      debug('msg not a list');
        console.log('msg not a list');
      return;
    }

    // trigger WAMP message types
    var typeId = msg.shift();
    if (! handlers[typeId]) {
      debug('unknown message type');
        consolog.log('unknown message type')
      return;
    }
    // this line dose WAMP protocol
    handlers[typeId].apply(self, [client, msg]);
  });

  client.on('close', function() {
    debug('client close');
//      /* for Object.keys() check out http://es5.github.com/#x15.2.3.14 */
//      for (var topic_1 in Object.keys(client.topics)) {
//      /* This line will caused a bug
//      * https://github.com/nicokaiser/wamp.io/issues/7
//      * */
//         delete self.topics[topic_1][client.id];
//    }
      /* for Object.keys() check out http://es5.github.com/#x15.2.3.14 */
      var toplicsKeys = Object.keys(client.topics);
      for (var topic in toplicsKeys) {
          delete self.topics[toplicsKeys[topic]][client.id];
      }
    delete self.clients[client.id];
  });

  return this;
};

/**
 * Publish an event to all subscribed clients
 *
 * @Param {Object} client
 * @param {String} topicUri
 * @param {Object} event
 * @param {String} exclude
 * @api public
 */

Server.prototype.publish = function(client, topicUri, event, exclude) {
    console.log(topicUri);
    console.log(event);
  if (this.topics[topicUri]) {
    var msg, id;
    var event = ["message","session id", event, client.id];
    msg = JSON.stringify([protocol.TYPE_ID_EVENT, topicUri, event]);
    this.broadcast(topicUri,msg,exclude);
  }
};

Server.prototype.broadcast = function(topicUri, msg, exclude){
//    var msg, id;
//    msg = JSON.stringify([protocol.TYPE_ID_EVENT, topicUri, event]);
    for (id in this.topics[topicUri]) {
        if (exclude && id === exclude) {
            continue;
        }
//        console.log(this.clients[id]);
        this.clients[id].send(msg);
        debug('delivered event to client ' + id);
        console.log('delivered event to client ' + id);
    }
}