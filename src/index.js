// NPM modules
const express = require("express");
const cors = require("cors");

// create and config server
const server = express();
server.use(cors());

// init express aplication
const port = 4000;
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

server.get("/api", async (req, res) => {
});

// static server
server.use(express.static("./public"));