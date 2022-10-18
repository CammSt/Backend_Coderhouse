const express = require("express");
const Server = require("./components/Socket");
const http = require("http")
const bodyParser = require('body-parser');

// import { initSocket } from './socket.js';
// import viewsRouters from './routers/views/index.js';

const app = express();

const PORT = process.env.PORT;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

const server = http.createServer(app);
Server.init(server)


server.listen(PORT, function() {
    console.log(` >>>>> 🚀 Server started at http://localhost:${server.address().port}<<<<<`)
})
  
app.use((error, request, response, next) => {
    
    if(error.statusCode){
        return response.status(error.statusCode).send(`Error ${error.statusCode}`)
    }
    console.log(error)
    response.status(500).json({error: "Something broke..."})
})