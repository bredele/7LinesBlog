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
  var store = new Store([]),

      widget = new Widget(store),

      transport = new Transport( io.connect(location.href) );

  store.setTransport( transport );

  store.sync("blog", "blog", "_view/article", {
    descendant : true
  });

  widget.plugins.add( "model", new Bind(store) );

  widget.alive( document.querySelector("section") );

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

