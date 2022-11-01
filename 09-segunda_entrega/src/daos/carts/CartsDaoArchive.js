import ArchiveContainer from "../../containers/ArchiveContainer.js"

class CartsDaoArchive extends ArchiveContainer {

    constructor() {
        super('carts.json')
    }

    async addItem(cart = { products: [], timestamp: new Date() }) {
        return super.addItem(cart)
    }
}

export default CartsDaoArchive
