require([
  'OObject',
  'Bind.plugin',
  'CouchDBView',
  'SocketIOTransport'
], function( Widget, Bind, Store, Transport ){

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