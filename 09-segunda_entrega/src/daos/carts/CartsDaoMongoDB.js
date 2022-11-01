import MongoDBContainer from "../../contenedores/MongoDBContainer.js"

class CartsDaoMongoDB extends MongoDBContainer {

    constructor() {
        super('carts', {
            products: { type: [], required: true },
            timeStamp: { type: String}
        })
    }

    async addItem(cart = { products: [], timeStamp: Date.now() }) {
        return super.addItem(cart)
    }
}

export default CartsDaoMongoDB
