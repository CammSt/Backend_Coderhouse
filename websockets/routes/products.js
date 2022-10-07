
const router = require('express').Router();

const ProductsContainer = require('../components/ProductsContainer');
const product = new ProductsContainer('products.json')

router.get('/', async ( request , response ) => {
    let data = await product.getProducts()
    response.render('pages/form', {isEmptyProducts: !data.length, products: data ,title: 'Productos' })
});

/* router.get('/productos', async ( request , response ) => {
    let data = await product.getProducts()
    response.render('pages/list', { isEmptyProducts: !data.length, products: data ,title: 'Productos' });
});*/

router.post('/productos', async ( request , response ) => {

    /* let { title, price, thumbnail } = request.body;
    console.log("body ", request.body);

    const newProduct = { title, price, thumbnail };
    product.addProduct(newProduct) */

    let data = await product.getProducts()
    response.send(data)
});



/* router.get('/productos', async ( request , response ) => {
    let data = await product.getProducts()
    response.render('pages/list', { isEmptyProducts: !data.length, products: data ,title: 'Productos' });
});*/

/* router.post('/productos', async ( request , response ) => {    
    /* let { title, price, thumbnail } = request.body;
    const newProduct = { title, price, thumbnail };
    product.addProduct(newProduct)

    response.redirect('/');
}); */


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
