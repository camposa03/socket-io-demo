const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//socket io functions

io.on('connection', socket => {
    console.log(`A user has connected: ${socket.request}`);

    socket.on('chat message', message => {
      console.log(`Received message from client: ${message}`);
      io.emit('chat message', message);
    });
    socket.on('disconnect', () =>{
        console.log('A user has disconnected');
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});