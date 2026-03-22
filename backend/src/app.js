import express from "express";
import {createServer} from "node:http";  //helps to connect both socket and express server

import {Server} from "socket.io";

import mongoose from "mongoose";
import {connectToSocket} from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/usersroutes.js";
const app = express();
const server = createServer(app);
const io =connectToSocket(server);

app.set("port",(process.env.PORT || 8000));

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended: true}));

app.use("/api/v1/users",userRoutes);


const start = async()=>{

    const connectiondb =await mongoose.connect("mongodb+srv://deepak664337_db_user:OFK8eIZ4iSKln8Ii@cluster0.ptuoy3e.mongodb.net/");
    console.log(`MONGO Connected DB host: ${connectiondb.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("listening oon port 8000");
    })
}
start();


