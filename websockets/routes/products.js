
const router = require('express').Router();

const ProductsContainer = require('../components/ProductsContainer');
const product = new ProductsContainer()

router.get('/', ( request , response ) => {
    let data = product.getProducts()
    response.render('index', {isEmpty: !data.length, products: data, title: 'Productos'});
});

router.get('/productos', ( request , response ) => {
    let data = product.getProducts()
    response.render( 'index', { isEmpty: !data.length, products: data, title: 'Productos'});
});

router.post('/productos', ( request , response ) => {
    
    let { title, price, thumbnail } = request.body;
    const newProduct = { title, price, thumbnail };
    
    product.addProduct(newProduct)
    let data = product.getProducts()
    response.render('index', {isEmpty: !data.length, products: data, title: 'Productos'});
});



/* 
router.get('/productos/:id', ( request , response ) => {

    let searchedProduct = product.findProduct(Number(request.params.id))

    if (searchedProduct) {
        response.send(searchedProduct, {title: 'Productos'});
    } else {
        response.status(404).send({ error: 'Producto no encontrado' });
    }
});

router.put('/productos/:id', ( request , response ) => {
    let id = Number(request.params.id)
    let body = request.body

    let productExists = product.productExists(id)

    if (productExists) {
        let updated = product.updateProduct(id, body)
        response.send(updated, {title: 'Productos'});

    } else {
        response.status(404).send({ error: 'Producto no encontrado' });
    }
});

router.delete('/productos/:id', ( request , response ) => {
    let id = Number(request.params.id)

    let productExists = product.productExists(id)

    if (productExists) {

        product.deleteProduct(id);
        response.send({ message: 'Producto eliminado' ,title:'Productos'});

    } else {
        response.status(404).send({ error: 'Producto no encontrado' });
    }
})  */

module.exports = router;
