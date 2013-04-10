
/*!
 * wamp.io: a node.js WAMP™ server
 * Copyright (c) 2012 Nico Kaiser <nico@kaiser.me>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var protocol = require('./protocol')
  , prefixes = require('./prefixes')
  , debug = require('debug')('wamp');

/*
 * { '1': [Function],
 * '2': [Function],
 * '5': [Function],
 * '6': [Function],
 * '7': [Function] }
 **/
var handlers = {};

/**
 * Prefix Message
 * 
 * @param {wsio.Connection} client
 * @param {Array} args prefix, uri
 */

handlers[protocol.TYPE_ID_PREFIX] = function(client, args) {
  prefix = args.shift();
  uri = args.shift();
  client.prefixes[prefix] = uri;
};

/**
 * Call Message
 * 
 * @param {wsio.Connection} client
 * @param {Array} args callId, procUri, ...
 */

handlers[protocol.TYPE_ID_CALL] = function(client, args) {
  callId = args.shift();
  prefixes.resolveOrPass(procUri = args.shift());
  args = args || [];

  // Callback function
  cb = function(err, result) {
    var msg;
    if (err) {
      // who generates the error?
      msg = [protocol.TYPE_ID_CALL_ERROR, callId, 'http://autobahn.tavendo.de/error#generic', err.toString()];
    } else {
      msg = [protocol.TYPE_ID_CALL_RESULT, callId, result];
    }
    client.send(JSON.stringify(msg));
  };
  this.emit('call', procUri, args, cb);
};

/**
 * Subscribe Message
 *
 * @param {wsio.Connection} client
 * @param {Array} args topicUri
 */

handlers[protocol.TYPE_ID_SUBSCRIBE] = function(client, args) {
  topicUri = prefixes.resolveOrPass(args.shift());
  client.topics[topicUri] = true;
  if (typeof this.topics[topicUri] === 'undefined') {
    this.topics[topicUri] = {};
  }
  this.topics[topicUri][client.id] = true;
  var msg = JSON.stringify([protocol.TYPE_ID_EVENT,topicUri,["joinRoom","session id",client.id]]);
    this.broadcast(topicUri,msg,false); // this is the "Server", server.js
  debug('subscribed client ' + client.id + ' for topic ' + topicUri);
    console.log('subscribed client ' + client.id + ' for topic ' + topicUri);
};

/**
 * Unsubscribe Message
 *
 * @param {wsio.Connection} client
 * @param {Array} args topicUri
 */

handlers[protocol.TYPE_ID_UNSUBSCRIBE] = function(client, args) {
    topicUri = prefixes.resolveOrPass(args.shift());
    if (topicUri) {
        delete client.topics[topicUri];
        delete this.topics[topicUri][client.id];
        debug('unsubscribed client ' + client.id + ' from topic ' + topicUri);
        console.log('unsubscribed client ' + client.id + ' from topic ' + topicUri);
//        console.log("client id is: " + typeof client.id);
//        var msg = JSON.stringify([protocol.TYPE_ID_EVENT,topicUri,["leftRoom","session id",client.id]]);
        this.broadcast(topicUri,msg,false);
    } else {
        for (var topic in Object.keys(client.topics)) {
            delete this.topics[topic][client.id];
        }
        client.topics = {};
        debug('unsubscribed client ' + client.id + ' from all topics');
        console.log('unsubscribed client ' + client.id + ' from all topics');
    }
};

/**
 * Publish Message
 *
 * @param {wsio.Connection} client
 * @param {Array} args topicUri, event, excludeMe
 */

handlers[protocol.TYPE_ID_PUBLISH] = function(client, args) {
  var topicUri = prefixes.resolveOrPass(args.shift());
  var event = args.shift();
  var excludeMe = args.shift();
  if (typeof excludeMe === 'undefined') {
    excludeMe = true;
  }
  var exclude;
  if (excludeMe) {
    exclude = client.id;
  }
  // calling Server.prototype.publish
  this.publish(client, topicUri, event, exclude);
  debug('publish event ' + event + ' for topicUri ' + topicUri);
    console.log('publish event ' + event + ' for topicUri ' + topicUri);
};

module.exports = handlers;
