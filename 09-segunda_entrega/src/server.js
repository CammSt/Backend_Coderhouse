import express from 'express'
const { Router } = express

import { productsDao as productsContainer,
        cartsDao as cartsContainer
} from './daos/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const admin = true

const productsRouter = new Router()
const cartsRouter = Router()

app.use('/api/products', productsRouter )
app.use('/api/carts', cartsRouter )


//////////////////////////////////// PRODUCTS ROUTES ///////////////////////////////////

productsRouter.get('/:id?', async ( request , response ) => { // Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)

    const { id } = request.params;

    if( id != undefined ) {  //Return specified product

        const product = await productsContainer.getByID(id)

        if( product != undefined ) {
            response.status(200).json({ "status": "success", "response": {product} })

        } else {
            response.status(404).json({ "status": "error", "msg": "Product not found"})
        }
    } else { //Return all products

        const products = await productsContainer.getAll()
        response.status(200).json({ "status": "success", "response": {products: products} })
    }
})

productsRouter.post('/', async ( request , response ) => {  // Para incorporar productos al listado (disponible para administradores)
    
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { body } = request
    body.timestamp = Date.now()

    let result = await productsContainer.addItem(body)
    
    if( result != undefined ) {
        response.status(200).json({ "status": "success", "msg": "Product successfully added", "response": {id: result}})
    } else {
        response.status(400).json({ "status": "error", "msg": "Product not added"})
    }
})

productsRouter.put('/:id', async ( request , response ) => { // Actualiza un producto por su id (disponible para administradores)
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id } = request.params
    const { body } = request

    const product = await productsContainer.getByID(id)

    if( product != undefined ) {
        let result = await productsContainer.update(id, body)

        if( result != undefined ) {
            response.status(200).json({ "status": "success", "msg": "Product updated"})
        } else {
            response.status(400).json({ "status": "error", "msg": "Product not updated"})
        }
    } else {
        response.status(404).json({ "status": "error", "msg": "Product not found"})
    }
})

productsRouter.delete('/:id', async ( request , response ) => {  // Borra un producto por su id (disponible para administradores)
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id } = request.params;
    const product = await productsContainer.getByID(id)

    if( product != undefined ) {

        let result = await productsContainer.delete(id)

        if( result != undefined ) {
            response.status(200).json({ "status": "success", "msg": "Product successfully deleted"})
        } else {
            response.status(400).json({ "status": "error", "msg": "Product not deleted"})
        }
    } else {
        response.status(404).json({ "status": "error", "msg": "Product not found"})
    }
})


//////////////////////////////////// CART ROUTES ///////////////////////////////////

cartsRouter.get('/', async ( request , response ) => { 

    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const result = await cartsContainer.getAll()

    if( result != undefined ) {
        response.status(200).json({ "status": "success", "response": { carts: result }})
    } else {
        response.status(400).json({ "status": "error", "msg": "No carts found"})
    }
})

cartsRouter.post('/', async ( request , response ) => {  // Crea un carrito y devuelve su id.
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const result = await cartsContainer.addItem()

    if( result != undefined ) {
        response.status(200).json({ "status": "success", "msg": "Cart successfully added", "response": { id: result }})
    } else {
        response.status(400).json({ "status": "error", "msg": "Cart not created"})
    }
})

cartsRouter.delete('/:id', async ( request , response ) => {  // Vacía un carrito y lo elimina.
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id } = request.params
    const result = await cartsContainer.delete(id)
    
    if ( result != undefined ) {
        response.status(200).json({ "status": "success", "msg": "Cart successfully deleted"})
    } else {
        response.status(404).json({ "status": "error", "msg": "Cart not found"})
    }
});

cartsRouter.get('/:id/products', async ( request , response ) => { // Me permite listar todos los productos guardados en el carrito
   
    if( admin != true) {  /// Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id } = request.params
    
    let cart = await cartsContainer.getByID(id)

    if( cart != undefined ){
        response.status(200).json({ "status": "success", "response" : { "cartProducts": cart.products }})
    } else {
        response.status(404).json({ "status": "error", "msg": "Cart not found"})
    } 
});

cartsRouter.post('/:id/products', async ( request , response ) => { // Para incorporar productos al carrito por su id de producto
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id } = request.params
    const cartID = id
    const productID = request.body['id']
    
    const productToAdd = await productsContainer.getByID(productID)

    if ( productToAdd != undefined ) {
        const cart = await cartsContainer.getByID(cartID);

        if( cart != undefined ) {

            cart.products.push(productToAdd)

            const result = await cartsContainer.update( cartID, cart )
            
            if( result != undefined) {
                response.status(200).json({ "status": "success", "msg": "Product successfully added"})
            } else {
                response.status(400).json({ "status": "error", "msg": "Product not added"})
            }
        } else {
            response.status(400).json({ "status": "error", "msg": "Product not added"})
        }
    } else {
        response.status(404).json({ "status": "error", "msg": "Product not found"})
    }
})

cartsRouter.delete('/:id/products/:id_prod', async ( request , response ) => { // Eliminar un producto del carrito por su id de carrito y de producto
   
    if( admin != true) {  // Unverified client
		response.status(401).json({ "status": "error", "msg": "Unauthorized" })
        return
    }

    const { id, id_prod } = request.params;
    const cart = await cartsContainer.getByID(id);

    if ( cart != undefined ) {

        const index = cart.products.findIndex( product => product.id === Number(id_prod))

        if (index != -1) {

            cart.products.splice(index, 1)
            const result = await cartsContainer.update( id, cart )

            if( result != undefined ) {
                response.status(200).json({ "status": "success", "msg": "Product successfully deleted"})
            } else {
                response.status(400).json({ "status": "error", "msg": "Product not deleted"})
            }

        } else {
            response.status(404).json({ "status": "error", "msg": "Product/Cart not found"})
        }
    } else {
        response.status(404).json({ "status": "error", "msg": "Product/Cart not found"})
    }
})


app.use( '*', ( request, response ) => {
	const path = request.params
    const method = request.method
    response.send( { "status": "error", "msg": `Route '${path[0]}' failed -- method ${method} not implemented` })
})


export default app