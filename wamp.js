/**
 * User: Ken
 * Date: 27/02/2013
 * Time: 14:01
 * This is another server for WebSocket Application Messaging Protocol (WAMP)
 */

/**
 * Module dependencies.
 */

var express = require('express') //http://nodejs.org/api/modules.html#modules_modules
    , routes = require('./routes')
    , api = require('./routes/api')()
    , room = require('./routes/room')
    , light = require('./routes/light')
    , sun = require('./routes/sun')
    , http = require('http')
    , path = require('path')
    , WebSocketServer = require('ws').Server
    , wampServer= require('./lib/wamp.io');

// "app" is a "request" object of the "_events" object in the "server"
var app = express();

// http.createServer(app) returns a server, "app" is called whenever an http request comes in
var server = http.createServer(app);
var wss = new WebSocketServer({server:server});
var wamp = wampServer.attach(wss);

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(routes.display404);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});
// middleware
function enableWamp(req, res, next) {
    req.wamp = wamp;
    next();
}

// get methods
app.get('/', routes.index);
app.get('/room',room.show);
app.get('/light',light.show);
app.get('/sun',sun.show);
app.get('/test', function(req,res){
    // test temperature sensor: un-comment the following line
//    res.sendfile(__dirname + '/public/test/TemperatureSensorTest.html');
    // test light actuator: un-comment the following line
//    res.sendfile(__dirname + '/public/test/LightActuatorTest.html');
    // test room: un-comment the following line
//    res.sendfile(__dirname + '/public/test/roomTest.html');
//    res.sendfile(__dirname + '/public/test/lightTest.html');
    res.sendfile(__dirname + '/public/test/testall.html');
});

// rpc
//wamp.on('call',api_tryout.rpc.call); // enable this if want to test rpc on WAMP
wamp.on('call', api.rpc.call);

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

