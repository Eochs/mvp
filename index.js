var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sim = require('./sim/sim.js');

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/client/index.html');
// });
app.use(express.static(__dirname + '/client'));

io.on('connection', function(socket){
  socket.on('new computation', function(data){
    for (var i = 0; i < 100; i++) {
      var normalRandVar = sim.normal(data.mean, data.variance, 100);
      socket.emit('new samples', normalRandVar); // limit to only the client sending new computation
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// var sim = require('./sim/sim.js');

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/client/index.html');
// });

// io.on('connection', function(socket){
//   console.log('a user connected, ready to compute...');

//   socket.on('new computation', function (data) {
//     // we tell the client to execute 'new computation'
//     // 
//     //sim.normal
//     console.log(data);
//     socket.emit('new samples', 7);
//   });

//   socket.on('error', function(err) {
//     console.log('errored out in sockets ', err);
//   });

//   socket.on('disconnect', function(){
//     console.log('user disconnected, all computations stopped.');
//   });
// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });