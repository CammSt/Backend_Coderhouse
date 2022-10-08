const express = require("express");
const Server = require("./components/Socket");
const http = require("http")
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

const PORT = process.env.PORT

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

app.use((error, req, res, next) => {
  if(error.statusCode){
    return res.status(error.statusCode).send(`Error ${error.statusCode}`)
  }
  console.log(error)
  res.status(500).json({error: "Something broke..."})
})

const server = http.createServer(app)
Server.init(server)

server.listen(PORT, function() {
  console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}   <<<<<`)
})
