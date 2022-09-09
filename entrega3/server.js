/* 
NODEJS

const http = require('http')

const server = http.createServer( (request, response) => {
    response.end("Hola mundo")
})

const connectedServer = server.listen( 8080, () => {
    console.log(`Servidor Http escuchado en el puerto ${connectedServer.address().port}`);
}) 
*/


//EXPRESS

const Contenedor = require('../entrega2/manejo_de_archivos.js')
const express = require('express');

const app = express()

const PORT = 8080


const server = app.listen( process.env.PORT || PORT, () => {
    console.log(`Servidor Http escuchado en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`))

const container = new Contenedor('productos.txt');

app.get('/productos', async ( request, response ) => {
    //devuelva un array con todos los productos disponibles en el servidor
    const showProducts = await container.getAll();
    response.send(showProducts);
})

app.get('/productoRandom', async ( request, response ) => {
    //devuelva un producto elegido al azar entre todos los productos disponibles
    const products = await container.getAll();
    const randomIndex = Math.floor(Math.random() * products.length);

    response.send( products[randomIndex] );
})
