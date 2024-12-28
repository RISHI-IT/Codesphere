const express=require('express');
const http=require('http');
const{Server}=require('socket.io');
const path=require('path');
//initialize the application and the server
const app=express();
const server=http.createServer(app);
const io=new Server(server);
//server static files
app.use(express.static(path.join(__dirname,'public')));
//handlewebsocket connections
io.on('connection',(socket)=>{
    console.log('A user connected');

socket.on('codeChange',(data)=>{
    socket.broadcast.emit('updateCode',data);
});
//handle disconnection
socket.on('disconnect',()=>{
    console.log('A user disconnected');
});
});
