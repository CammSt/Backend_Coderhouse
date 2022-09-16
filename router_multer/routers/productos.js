const router = require('express').Router();

const Producto = require('../components/Producto');


router.get('/productos', ( request , response ) => {
    response.send(Producto.productos);
});

router.get('/productos/:id', ( request , response ) => {

    let producto = Producto.productos.find(producto => producto.id === Number(request.params.id));

    if (producto) {
        response.send(producto);
    } else {
        response.status(404).send({ error: 'Producto no encontrado' });
    }
});

router.post('/productos', ( request , response ) => {

    let { title, price, thumbnail } = request.body;
    const producto = { title, price, thumbnail };

    producto.id = Producto.productos.length + 1;
    Producto.productos.push(producto);

    response.send(Producto.productos);
});

router.put('/productos/:id', ( request , response ) => {
    let { title, price, thumbnail } = request.body;
    let index = Producto.productos.findIndex(producto => producto.id === Number(request.params.id));

    if (index >= 0) {
        Producto.productos[index] = { title, price, thumbnail };
        Producto.productos[index].id = Number(request.params.id);
        response.send(Producto.productos[index]);

    } else {
        response.status(404).send({ error: 'Producto no encontrado' });
    }
});

router.delete('/productos/:id', ( request , response ) => {
    let index = Producto.productos.findIndex(producto => producto.id === Number(request.params.id));
    if (index >= 0) {
        Producto.productos.splice(index, 1);
        response.send({ message: 'Producto eliminado' });
    } else {
        response.status(404).send({ error: 'Producto no encontrado' });
    }
})

module.exports = router;