const { v4: uuidv4 } = require('uuid');

const router = require('express').Router();
const CartContainer = require('../components/CartContainer')

const cartContainer = new CartContainer('carts.json')


router.post('/', ( request , response ) => {
    // Crea un carrito y devuelve su id.

    let timestamp = Date.now();
    let id = uuidv4(); // unique id generator

    cartContainer.addCart({timestamp, id})

    res.status(200).json({ "status": "success", "msg": "Cart created", "response" : { "cartID": id } })
});

router.delete('/:id', ( request , response ) => {
    // Vacía un carrito y lo elimina.
});

router.get('/:id/productos', ( request , response ) => {
    // Me permite listar todos los productos guardados en el carrito
});

router.post('/:id/productos', ( request , response ) => {
    // Para incorporar productos al carrito por su id de producto
});

router.delete('/:id/productos/:id_prod', ( request , response ) => {
    // Eliminar un producto del carrito por su id de carrito y de producto
});

module.exports = router;


/* 

// DELETE /api/carrito/id
routerCart.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await carrito.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "cart successfully removed"})
        : res.status(404).json({"error": "cart not found"})
})

// POST /api/carrito/:id/productos
routerCart.post('/:id/productos', async(req,res) => {
    const {id} = req.params;
    const { body } = req;
    
    const product = await contenedor.getById(body['id']);
    
    if (product) {
        const cartExist = await carrito.addToArrayById(id, {"products": product});
        cartExist
            ? res.status(200).json({"success" : "product added"})
            : res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found, verify the ID in the body content is correct."})
    }
})

// GET /api/carrito/:id/productos
routerCart.get('/:id/productos', async(req, res) => {
    const { id } = req.params;
    const cart = await carrito.getById(id)
    
    cart
        ? res.status(200).json(cart.products)
        : res.status(404).json({"error": "cart not found"})
})

// DELETE /api/carrito/:id/productos/:id_prod
routerCart.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params;
    const productExists = await contenedor.getById(id_prod);
    if (productExists) {
        const cartExists = await carrito.removeFromArrayById(id, id_prod, 'products')
        cartExists
            ? res.status(200).json({"success" : "product removed"})
            : res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found"})
    }
}) */