const express = require("express");
const http = require("http")
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT
const admin = true

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

server.listen(PORT, function() {
	console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}   <<<<<`)
})


//////////////////////////////////////// ROUTERS ////////////////////////////////////////

const ProductsContainer = require('./components/ProductsContainer')
const CartContainer = require('./components/CartContainer')

const productsContainer = new ProductsContainer('products.json')
const cartContainer = new CartContainer('carts.json')


//AUTH MIDDLEWARE
/* const authMiddleware = app.use( ( request, response, next ) => {

	if( request.header('Authorization') === process.env.AUTH_TOKEN  ) {  // Verified client
		next()
	} else {  // Not verified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
	}
}) */

const productsRouter = require('express').Router()
const cartsRouter = require('express').Router()

app.use('/api/productos', productsRouter )
app.use('/api/carrito', cartsRouter )

app.get('*', function(req, res){
    res.status(404).send({"status":"error", "msg":"Not implemented"});
});

//////////////////////////////////// PRODUCTS ROUTES ///////////////////////////////////


productsRouter.get('/:id?', ( request , response ) => { // Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)

    const { id } = request.params;

    if( id != undefined ) {  //Return specified product

        const product = productsContainer.findProduct(id)

        if( product != undefined ) {
            response.status(200).json({ "status": "success", "response": {product} })

        } else {
            response.status(404).json({ "status": "error", "msg": "Product not found"})
        }
    } else { //Return all products

        const products = productsContainer.getProducts()
        response.status(200).json({ "status": "success", "response": {products: products} })
    }
});

productsRouter.post('/', ( request , response ) => {  // Para incorporar productos al listado (disponible para administradores)
    
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { body } = request
    body.timestamp = Date.now()

    let result = productsContainer.addProduct(body)

    if( result != undefined ) {
        response.status(200).json({ "status": "success", "msg": "Product successfully added", "response": {id: result}})

    } else {
        response.status(400).json({ "status": "error", "msg": "Product not added"})
    }
});

productsRouter.put('/:id', ( request , response ) => { // Actualiza un producto por su id (disponible para administradores)
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id } = request.params
    const { body } = request

    const product = productsContainer.findProduct(id)

    if( product != undefined ) {
        let result = productsContainer.updateProduct(id, body)

        if( result != undefined ) {
            response.status(200).json({ "status": "success", "msg": "Product updated"})

        } else {
            response.status(400).json({ "status": "error", "msg": "Product not updated"})
        }
    } else {
        response.status(404).json({ "status": "error", "msg": "Product not found"})
    }
});

productsRouter.delete('/:id', ( request , response ) => {  // Borra un producto por su id (disponible para administradores)
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id } = request.params;
    const product = productsContainer.findProduct(id)

    if( product != undefined ) {

        let result = productsContainer.deleteProduct(id)

        if( result != undefined ) {
            response.status(200).json({ "status": "success", "msg": "Product successfully deleted"})

        } else {
            response.status(400).json({ "status": "error", "msg": "Product not deleted"})
        }

    } else {
        response.status(404).json({ "status": "error", "msg": "Product not found"})
    }
});


//////////////////////////////////// CART ROUTES ///////////////////////////////////

cartsRouter.post('/', ( request , response ) => {  // Crea un carrito y devuelve su id.
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const result = cartContainer.addCart()

    if( result != undefined ) {
        response.status(200).json({ "status": "success", "msg": "Cart successfully added", "response": { id: result }})
    } else {
        response.status(400).json({ "status": "error", "msg": "Cart not created"})
    }
});

cartsRouter.delete('/:id', ( request , response ) => {  // Vacía un carrito y lo elimina.
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id } = request.params
    const result = cartContainer.deleteCart(id)
    
    if ( result != undefined ) {
        response.status(200).json({ "status": "success", "msg": "Cart successfully deleted"})
    } else {
        response.status(404).json({ "status": "error", "msg": "Cart not found"})
    }
});

cartsRouter.get('/:id/productos', ( request , response ) => { // Me permite listar todos los productos guardados en el carrito
   
    if( admin != true) {  /// Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id } = request.params
    
    let cartProducts = cartContainer.getCartProducts(id)
    if( cartProducts != undefined ){
        response.status(200).json({ "status": "success", "response" : { "cartProducts": cartProducts }})
    } else {
        response.status(404).json({ "status": "error", "msg": "Cart not found"})
    } 
});

cartsRouter.post('/:id/productos', ( request , response ) => { // Para incorporar productos al carrito por su id de producto
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id } = request.params
    
    const productToAdd = productsContainer.findProduct( request.body['id'] )

    if ( productToAdd != undefined ) {
        const result = cartContainer.addProductToCart(id, productToAdd);

        if( result != undefined ) {
            response.status(200).json({ "status": "success", "msg": "Product successfully added"})
        } else {
            response.status(400).json({ "status": "error", "msg": "Product not added"})
        }
    } else {
        response.status(404).json({ "status": "error", "msg": "Product not found"})
    }
});

cartsRouter.delete('/:id/productos/:id_prod', ( request , response ) => { // Eliminar un producto del carrito por su id de carrito y de producto
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id, id_prod } = request.params;

    const searchedProduct = cartContainer.findProductInCart(id,id_prod);

    if ( searchedProduct != undefined) {
        const result = cartContainer.deleteProductFromCart(id, id_prod)

        if( result != undefined ) {
            response.status(200).json({ "status": "success", "msg": "Product successfully deleted"})
        } else {
            response.status(400).json({ "status": "error", "msg": "Product not deleted"})
        }
    } else {
        response.status(404).json({ "status": "error", "msg": "Product/Cart not found"})
    }
});
