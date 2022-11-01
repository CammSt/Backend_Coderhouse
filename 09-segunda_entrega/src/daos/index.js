import dotenv from 'dotenv'
dotenv.config()

let productsDao
let cartsDao

switch (process.env.PERS) {
    case 'firebase':
        const { default: ProductsDaoFirebase } = await import('./products/ProductsDaoFirebase.js')
        const { default: CartsDaoFirebase } = await import('./carts/CartsDaoFirebase.js')

        productsDao = new ProductsDaoFirebase()
        cartsDao = new CartsDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductsDaoMongoDB } = await import('./products/ProductsDaoMongoDB.js')
        const { default: CartsDaoMongoDB } = await import('./carts/CartsDaoMongoDB.js')

        productsDao = new ProductsDaoMongoDB()
        cartsDao = new CartsDaoMongoDB()
        break
    case 'json':
        const { default: ProductsDaoArchive } = await import('./products/ProductsDaoArchive.js')
        const { default: CartsDaoArchive } = await import('./carts/CartsDaoArchive.js')

        productsDao = new ProductsDaoArchive()
        cartsDao = new CartsDaoArchive()
        break
    default:
        const { default: ProductsDaoMem } = await import('./products/ProductsDaoMem.js')
        const { default: CartsDaoMem } = await import('./carts/CartsDaoMem.js')

        productsDao = new ProductsDaoMem()
        cartsDao = new CartsDaoMem()
        break
}

export { productsDao, cartsDao }