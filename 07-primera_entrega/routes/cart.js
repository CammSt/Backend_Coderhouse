const router = require('express').Router();

router.post('/', ( request , response ) => {
    // Crea un carrito y devuelve su id.
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