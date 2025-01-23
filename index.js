const express = require("express");
const app = express();

const players = [];

class Player {
  constructor(id) {
    this.id = id;
  }
}

app.get("/unirse", (req, res) => {
  const id = `${Math.floor(Math.random() * 1000000)}`;

  const player = new Player(id);
  players.push(player);

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.send(id);
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
