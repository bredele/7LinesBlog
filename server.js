var http  = require("http"),
  connect = require("connect"),
  io = require("socket.io"),
  olives = require("olives"),
  tools = require("couchdb-emily-tools");

    
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