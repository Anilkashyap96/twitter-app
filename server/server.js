const path = require('path');
const http = require('http');
const publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');

const GenerateMessage = require('./utils/message')
const app = express();
const server = http.createServer(app);

var io = socketIO(server);
app.use(express.static(publicpath));

io.on('connection', (socket)=>{
 console.log('new user connected');
 socket.emit('newEmail', {
     "from": "anil@gmail.com",
     "to": "kashyap@gmail.com"
 })
socket.emit('newMessage',GenerateMessage('Admin', 'Welcome to Live basic twitter app'))
socket.broadcast.emit('newMessage',GenerateMessage('Admin', 'New user has been joined'));
 socket.on('createMessage', (message, callback) => {
    console.log('create /message',message);
    io.emit('newMessage', GenerateMessage(message.from, message.text));
    callback();
 });
 socket.on('disconnect', ()=> {
    console.log("user disconnected");
 })
});
server.listen(port, () => {
    console.log(`Server is up on ${port} 3000`)
    console.log("copy and paste it browser: http://localhost:3000");
});