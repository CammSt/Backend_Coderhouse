const express = require('express')
const path = require('path')
const {engine} = require('express-handlebars')

const app = express()

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const productos = require('./routes/products')

const PORT = process.env.NODE_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));


app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/', productos)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

server.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))