import MemoryContainer from "../../containers/MemoryContainer.js"

class CartsDaoMem extends MemoryContainer {

    async addItem(cart = { products: [] }) {
        return super.addItem(cart)
    }
}

export default CartsDaoMem
