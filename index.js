var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);
var users = [];

function handler (req, res) {
  res.send({messaga:"welcome"});
}

io.on('connection', function (socket) {
  socket.on('user_id',(data)=>{
    users.push({
      user_id:data.id,
      socket:socket
    });
    console.log(users.length)
  })
  socket.on('disconnect',(data)=>{
    let index = users.indexOf(socket)
    users.splice(1,index+1)
    console.log(users)
  })
  socket.emit('message', { my: 'you are successfully connected' });
});