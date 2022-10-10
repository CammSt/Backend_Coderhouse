const { v4: uuidv4 } = require('uuid');

const router = require('express').Router();
const ProductsContainer = require('../components/ProductsContainer')
const CartContainer = require('../components/CartContainer')

const cartContainer = new CartContainer('carts.json')
const productsContainer = new ProductsContainer('products.json')

router.get('/', ( request , response ) => {
    // Devuelve todos los carritos

    let carts = cartContainer.getAllCarts()

    response.status(200).json({ "status": "success", "response": {carts} })
});



router.post('/', ( request , response ) => {
    // Crea un carrito y devuelve su id.

    let timestamp = Date.now()
    let id = uuidv4() // unique id generator

    const result = cartContainer.addCart({timestamp, id})

    if( result != undefined ) {
        response.status(200).json({ "status": "success", "msg": "Cart successfully added" })
    } else {
        response.status(400).json({ "status": "error", "msg": "Cart not created"})
    }
});

router.delete('/:id', ( request , response ) => {
    // Vacía un carrito y lo elimina.

    const { id } = request.params
    const result = cartContainer.deleteCart(id)
    
    if ( result != undefined ) {
        response.status(200).json({ "status": "success", "msg": "Cart successfully deleted"})
    } else {
        response.status(404).json({ "status": "error", "msg": "Cart not found"})
    }
});

router.get('/:id/productos', ( request , response ) => {
    // Me permite listar todos los productos guardados en el carrito

    const { id } = request.params
    
    let cartProducts = cartContainer.getCartProducts(id)
    if( cartProducts != undefined ){
        response.status(200).json({ "status": "success", "response" : { "cartProducts": cartProducts }})
    } else {
        response.status(404).json({ "status": "error", "msg": "Cart not found"})
    } 
});

router.post('/:id/productos', ( request , response ) => {
    // Para incorporar productos al carrito por su id de producto

    const { id } = request.params
    
    const productToAdd = productsContainer.findProduct( body['id'] )

    if ( productToAdd != undefined ) {
        const result = cartContainer.addProductToCart(id, productToAdd);

        if( result != undefined ) {
            response.status(200).json({ "status": "success", "msg": "Product successfully added"})
        } else {
            response.status(400).json({ "status": "error", "msg": "Product not added"})
        }
    } else {
        response.status(404).json({ "status": "error", "msg": "Product/Cart not found"})
    }
});

router.delete('/:id/productos/:id_prod', ( request , response ) => {
    // Eliminar un producto del carrito por su id de carrito y de producto

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

module.exports = router;