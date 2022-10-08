const router = require('express').Router();

router.get('/:id?', ( request , response ) => {
    // Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
});

router.post('/', ( request , response ) => {
    // Para incorporar productos al listado (disponible para administradores)
});

router.put('/:id', ( request , response ) => {
    // Actualiza un producto por su id (disponible para administradores)
});

router.delete('/:id', ( request , response ) => {
    // Borra un producto por su id (disponible para administradores)
});

module.exports = router;


