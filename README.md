7LinesBlog
==========

A 7 lines JavaScript to create a simple real-time blog with Olives.js

## Client-side

```js
//1
require([
  'OObject',
  'Bind.plugin',
  'CouchDBView',
  'SocketIOTransport'
], function( Widget, Bind, Store, Transport ){

  //7 OUPS!!!!!!!!!!
  var store = new Store([]), //set couchdb model

      widget = new Widget(store),

      transport = new Transport( io.connect(location.href) );

  store.setTransport( transport ); //set socket.io transport layer

  store.sync("blog", "blog", "_view/article", {
    descendant : true
  }); //synchronize store with couchdb design view

  widget.plugins.add( "model", new Bind(store) ); //bind couchdb model with html

  widget.alive( document.querySelector("section") ); //let magic happen 

});
```

Let's refactor this a little bit!

```js
//1
require(['OObject','Bind.plugin','CouchDBView','SocketIOTransport'], function( Widget, Bind, Store, Transport ){

  //2
  var store = new Store([]), widget = new Widget(store), transport = new Transport( io.connect(location.href) );

  //3
  store.setTransport( transport );

  //4
  store.sync("blog", "blog", "_view/article", { descendant : true});

  //5
  widget.plugins.add( "model", new Bind(store) );

  //6
  widget.alive( document.querySelector("section") );

//7
});
```

JavaScript is Magic!

## Server-side
var http  = require("http"),
  connect = require("connect"),
  io = require("socket.io"),
  olives = require("olives"),
  tools = require("couchdb-emily-tools");

//you don't necesarrily need this part
var socket = io.listen(
  http.createServer(connect()
    .use(connect.responseTime())
    .use(connect.cookieParser())
    .use(connect.static(__dirname + "/public"))
  ).listen(8001), {log:true});

http.globalAgent.maxSockets = Infinity;

// register transport
olives.registerSocketIO(socket);

// Add the CouchDB handler to Olives
olives.handlers.set("CouchDB", tools.handler);

## Couchdb-side

After [installing](http://couchdb.apache.org/) couchdb, create a db called ```blog``` and then create a design view as following:

 ```js
 {
   "_id": "_design/blog",
   "_rev": "3-dd0455871175835dca84bfccc315d4f2",
   "views": {
       "article": {
           "map": "function(doc){emit(doc._id, doc);}"
       }
   }
}
```

