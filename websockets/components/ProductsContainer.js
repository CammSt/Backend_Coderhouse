class ProductsContainer {

    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products
    }

    addProduct(product) {
        product.id = this.products.length + 1;
        this.products.push(product)
    }

    findProduct(id) {
        return this.products.find( producto => producto.id === id );
    }

    productExists(id){
        return this.findProduct(id) != undefined
    }

    updateProduct(id, data) {
        let { title, price, thumbnail } = data

        let searchedProduct = this.findProduct(id)
        let index = this.products.indexOf(searchedProduct)

        this.products[index] = { title: title, price: price, thumbnail: thumbnail, id:id}

        return this.products[index]
    }

    deleteProduct(id) {
        let searchedProduct = this.findProduct(id)
        let index = this.products.indexOf(searchedProduct)
        this.products.splice(index,1)
    }
}

module.exports = ProductsContainer;