let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

server.listen(3000, () => {
    console.log("Сервер запущен");
});

app.get('/', function(request, respons){
    respons.sendFile(__dirname + '/index.html');
});

connections = [];

io.sockets.on('connection', function(socket){
    console.log('Пользователь подключен!');
    connections.push(socket);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Пользователь отключен!');
    });

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });
});
