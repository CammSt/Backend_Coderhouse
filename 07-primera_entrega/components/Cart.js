const Product = require('./Product')

class Cart {
    
    constructor( id, timeStamp, productos ) {
        this.id = id,
        this.timeStamp = timeStamp,
        this.products = productos
    }

    updateProduct(data) {
        this.timeStamp = data.timeStamp,
        this.products = data.productos
    }

    productData(){
        let data = { 
           id: this.id,
           timeStamp: this.timeStamp,
           productos: this.products
        }
        return data
    }

    getProducts() {
        return this.products
    }

    addProductToCart(product) {
        //Adds a product to the products array and saves it in file -- returns undefined or product's id
 
        let id = this.products.length + 1
        let { timeStamp, name, description, code, image, price, stock } = product
 
        let newProduct = new Product(id, timeStamp, name, description, code, image, Number(price), stock)
        this.products.push(newProduct)
 
        let result = this.saveInFile()
        if( result === 1) {
            //if saving in file fails the product gets deleted from the products' local list
            this.deleteProduct(id)
            return undefined
        } else {
            //if product is saved in file its id gets returned
            return product.id
        }
     }
 
    findProductInCart(id) {
        //Finds product by id in products array -- returns product or undefined
        return this.products.find( product => product.id === id );
    }
 
    productExistsInCart(id){
        //Returns boolean indicating if product id exists in products array  -- returns true or false
        return this.findProduct(id) != undefined
    }
 
    updateProductInCart(id, data) {
        //Modify product searched by id in products array and saving it in file  -- returns undefined or product

        let searchedProduct = this.findProduct(id)

        if( searchedProduct === undefined ) {
            return undefined
        }

        const searchedProductCopy = structuredClone(searchedProduct);
        searchedProduct.updateProduct(data)

        let result = this.saveInFile()
        if( result === 1) {
            //if saving in file fails the product returns to its original state
            let oldData = searchedProductCopy.productData()
            searchedProduct.updateProduct(oldData)
            return undefined
        } else {
            //if product is saved in file it gets returned updated
            return this.products[index]
        }
    }

    deleteProductFromCart(id) {
        //Deletes product by id from products list and file
        let searchedProduct = this.findProduct(id)

        if( searchedProduct === undefined ) {
            return undefined
        } 

        let index = this.products.indexOf(searchedProduct)
        this.products.splice(index,1)

        let result = this.saveInFile()
        if( result === 1) {
            //if saving in file fails the product gets added back to products list
            this.addProduct(searchedProduct)
            return undefined
        } else {
            //if product is deleted the return is the product
            return searchedProduct
        }
    }

}

module.exports = Cart
