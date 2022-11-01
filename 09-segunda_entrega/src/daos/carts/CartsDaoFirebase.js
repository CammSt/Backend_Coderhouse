import FirebaseContainer from "../../containers/FirebaseContainer.js"

class CartsDaoFirebase extends FirebaseContainer {

    constructor() {
        super('carts')
    }

    async addItem(carts = { products: [], timeStamp: Date.now() }) {
        return super.addItem(carts)
    }
}

export default CartsDaoFirebase
