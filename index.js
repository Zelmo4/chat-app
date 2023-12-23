import express from "express";
import path from 'path';
import {fileURLToPath} from "url";

import {createServer} from 'node:http';
import {Server} from 'socket.io';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
});

const server = createServer(app);

const io = new Server(server);

io.on('connection',(socket) =>{
    console.log("User has been connected to your server")

    socket.on('chat:message',(msg)=>{
        console.log('msg recieve: ' + JSON.stringify(msg))
        io.emit('chat:message',msg)
    })
});

server.listen(3000,()=>{
    console.log("App running at port: 3000");
});
