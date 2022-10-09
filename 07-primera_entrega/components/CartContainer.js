const fs = require("fs");
const Product = require('./Product')

class Cart {

    constructor( id, timestamp ) {
        this.products = [],
        this.id = id,
        this.timestamp = timestamp
    }

    addCart() {

    }


    getCartProducts() {
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
        return this.products.find( producto => producto.id === id );
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


    //// ------- FILE METHODS -------- /////

    async readFileOrCreateOne() {
        try {
            let readData = await fs.promises.readFile(this.filename, "utf-8");
            
            if(readData.length != 0){
                this.products = JSON.parse(readData) 
            }

        } catch (error) {
            console.log("error ", error);

            if( error.code === "ENOENT" ) {
                this.createEmptyFile()
            } else {
                console.log( `Error: ${error.code} | Could not read file: ${this.filename}` )
            }
        }
    }

    async createEmptyFile() {
        fs.writeFile(this.filename, "[]", (error) => {
            if( error ) {
                console.log(error)
            } else {
                console.log(`File ${this.filename} was created`);
            }
        })
    }

    async saveInFile() {
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(this.products,null,2));
            return 0
        } catch (error) {
            console.log(`Error Code: ${error.code} | There was an error trying to save the product`);
            return 1
        }
    }
}

module.exports = Cart;