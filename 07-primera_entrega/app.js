const express = require("express");
const http = require("http")
const bodyParser = require('body-parser');
const path = require("path");

const products = require('./routes/products')
const cart = require('./routes/cart')

const app = express();

const PORT = process.env.PORT

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

app.use('/productos',products )
app.use('/carrito',cart )

/* app.get('/',(req, res) =>{
  res.redirect('/productos')
}) */


app.use((error, req, res, next) => {
  if(error.statusCode){
    return res.status(error.statusCode).send(`Error ${error.statusCode}`)
  }
  console.log(error)
  res.status(500).json({error: "Something broke..."})
})

const server = http.createServer(app)

server.listen(PORT, function() {
  console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}   <<<<<`)
})
