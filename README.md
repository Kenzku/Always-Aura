Always-Aura
===========

This is a part of my Master's thesis work, the topic is **Web Technology on Internet of Things**.

The problem is that I would like to try out runing a WAMP server on each of sensors, so that each sensor is enable to use
publish/subscribe mode and RPC mode. By doing this, the whole architecture can get benefit from using less port, but will 
maintain websocket connections instead. 

With Publish/Subscribe mode, sensors or servers can Publish/Subscribe on topics that fit their interest; while with RPC,
sensors/actuator can be trigger to do extra things.

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


