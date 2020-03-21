const path = require('path');
const http = require('http');
const publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
if(typeof localStorage == 'undefined' || localStorage == null){
   const localstorage = require('node-localstorage').LocalStorage;
   localStorage = new localstorage('./scratch');
}

const GenerateMessage = require('./utils/message')
const app = express();
const server = http.createServer(app);

function checkLogin(req, res, next){
   try{
       var token = localStorage.getItem('token');
       jwt.verify(token, 'shhhh')
   }catch(e){
       res.send("User is not logged In");
   }
   next();
}
app.get('/login', (req, res)=>{
   var user = {
       id: 1,
       name: "Anil Kashyap",
       age: 25
   }
   var token = jwt.sign({user:'user'},'shhhh');
   console.log(token);
   localStorage.setItem('token', token);
   res.send("Logged In successfully!");
})
app.get('/logout', (req, res)=>{
   localStorage.removeItem('token')
   res.send('Logout successfully!');
});


var io = socketIO(server);
app.use(express.static(publicpath));

io.on('connection', (socket)=>{
 console.log('new user connected');
socket.emit('newMessage',GenerateMessage('Admin', 'Welcome to Live basic twitter app'))
socket.broadcast.emit('newMessage',GenerateMessage('Admin', 'New user has been joined'));
 socket.on('createMessage', (message, callback) => {
    console.log('create /message',message);
    io.emit('newMessage', GenerateMessage(message.from, message.text));
    callback();
 });
 socket.on('disconnect', ()=> {
    console.log("user disconnected");
    socket.broadcast.emit('newMessage',GenerateMessage('User', 'User has been disconnected'));
 })
});
server.listen(port, () => {
    console.log(`Server is up on ${port} 3000`)
    console.log("copy and paste it browser: http://localhost:3000");
});
