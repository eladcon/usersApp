var http = require('http'),
    express = require('express'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/../public')); 

routes(app, io);

server.listen(8080);
