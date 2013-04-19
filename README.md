Always-Aura
===========

This is a part of my Master's thesis work, the topic is **Web Technology on Internet of Things**. The primary technology is
```WebSocket``` with sub-protocol ```WAMP``` (More see: http://wamp.ws)

In short, which WebSocket + WAMP you can:

"Do more with less, Create real-time enabled Web and Mobile applications powered directly from your database". 

## Phase One

Before deployment on sensors, the application simulates an environment that keeps the room luminance in a constant level. So in the application, there are concepts of room, light and sun on the user interface. 

The simulation is built on top of ```Node.js```, which acts as a sensor/actuator and ```CouchDB``` simulates the delay. Lights act as the state of the sensor, e.g. on and off; The room acts as the actuator, where you can turn on the light; The sun simulates the nature light. In short, when the sun sets, in order to keep the light luminance at a constant level, the light should become brighter.

Three layers Actuator and Sensor APIs are built on ```Node.js```. These APIs will connect to ```WAMP.IO```, which actually implements ```WAMP``` protocol. Relevant APIs have been implemented on the front-end so the room, lights and sun can be functional.


## Why I do this?

The problem is that I would like to try out runing a ```WAMP``` server on each of sensors, so that each sensor is enable to use
publish/subscribe mode and RPC mode. By doing this, the whole architecture can get benefit from using less port, but will 
maintain websocket connections instead. 

With Publish/Subscribe mode, sensors or servers can Publish/Subscribe on topics that fit their interest; while with RPC,
sensors/actuator can be trigger to do extra things.

## What's more?

Moreover, apart from the above, I will also use this architecture to implement mirror tabs. i.e. one tab (slave) of a browser
will follow the action of its master browser.

## Build the app

To sreve the application you need a server running Node.js with NPM installed. Step to get the web server running:

    cd WAMP-Tryout
    npm install
    node wamp.js

```wamp.js``` itself acts as a webserver and WAMP server.

**The application is still under development** and it does not work yet. But, you can checkout the released video at:

* Light and Room First Demo
    http://www.youtube.com/watch?v=4UlWY4956e4


