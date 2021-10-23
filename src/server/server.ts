import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";

import {PlayerModel} from "./schemas/player.schema.js";
import {GameModel} from "./schemas/game.schema.js";
import {CardModel} from "./schemas/card.schema.js";
import { setupCardsInitial } from "./helpers/initial.js";
import { addRandomCards, findNotUsedCards, findPlayerByCardTitle, getGameState, onAddGame, onAddName, onConnection, passOutCards } from "./helpers/io.sim.js";




async function runner() {
  // setupCardsInitial();
  // await onConnection('1');
  // await onAddGame('123');
  // await onAddName('1', 'test', '123');
  // await onConnection('2');

  // await onConnection('3');
  // await onAddName('3', 'test3', '123');
  // await onAddName('2', 'test2', '123');
  // await addRandomCards('123');
  passOutCards('123');
  const state = await getGameState('123');
  // const werewolves = await findPlayerByCardTitle('Werewolf');
  const unusedCards = await findNotUsedCards('123');
  console.log(JSON.stringify(unusedCards, null, 4));
  
  

  // setTimeout(() => {
  //   mongoose.connection.db.dropDatabase(function(err, result) {
  //     console.log(err, result); console.log('DB dropped');
  //   });
  // } , 20000);
}

runner();




dotenv.config();
const app = express();
const server = http.createServer(app);




const io = new socketIO.Server(server,  { cors: {
  origin: '*'
}});

const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/werewolf")
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));
app.use(express.json());

app.get("/", function (req, res) {
  res.json({ message: "test" });
});


server.listen(PORT, function () {
  console.log(`starting at localhost http://localhost:${PORT}`);
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('message', 'work')
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

