var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});

io.on('connection', function (socket) {
    console.log('a user connected');

    let name = 'U' + (socket.id).toString().substr(1,4);
    socket.broadcast.emit('newUser', name);
    socket.emit('userName', name);
});