
const router = require('express').Router();

const ProductsContainer = require('../components/ProductsContainer');
const product = new ProductsContainer('products.json')

const ChatContainer = require('../components/ChatContainer');
const message = new ChatContainer('chat.json')

router.get('/', async ( request , response ) => {
    let data = await product.getProducts()
    let messages = await message.getAll()
    response.render('index', { isEmptyProducts: !data.length, products: data, messages: messages ,title: 'Productos' });
});

router.get('/productos', async ( request , response ) => {
    let data = await product.getProducts()
    let messages = await message.getAll()
    response.render('index', { isEmptyProducts: !data.length, products: data, messages: messages ,title: 'Productos' });
});

router.post('/productos', async ( request , response ) => {
    
    let { title, price, thumbnail } = request.body;
    const newProduct = { title, price, thumbnail };
    
    product.addProduct(newProduct)
    let data = await product.getProducts()
    let messages = await message.getAll()

    response.render('index', { isEmptyProducts: !data.length, products: data, messages: messages ,title: 'Productos' });
});

router.post('/message', async ( request , response ) => {
    
    let { user, message, date, time } = request.body;
    const newMessage = { user, message, date, time };
    
    message.addMessage(newMessage)
    
    let data = await product.getProducts()
    let messages = await message.getAll()

    response.render('index', { isEmptyProducts: !data.length, products: data, messages: messages ,title: 'Productos' });
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
