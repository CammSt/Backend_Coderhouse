const router = require('express').Router()

const ProductsContainer = require('../components/ProductsContainer')
const productsContainer = new ProductsContainer('products.json')

router.get('/:id?', ( request , response ) => { // Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
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

router.post('/', ( request , response ) => {  // Para incorporar productos al listado (disponible para administradores)

    const { body } = request
    body.timestamp = Date.now()

    let result = productsContainer.addProduct(body)

    if( result != undefined ) {
        response.status(200).json({ "status": "success", "msg": `Product added with ID: ${result} `})

    } else {
        response.status(400).json({ "status": "error", "msg": "Product not added"})
    }
});

router.put('/:id', ( request , response ) => { // Actualiza un producto por su id (disponible para administradores)
    
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

router.delete('/:id', ( request , response ) => {  // Borra un producto por su id (disponible para administradores)

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

module.exports = router;


