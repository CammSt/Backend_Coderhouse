const fs = require("fs");
const Product = require('./Product')
const Cart = require('./Cart')

class CartContainer {

    constructor( filename ) {
        this.filename = filename,
        this.carts = []
    }


    /////////////////////////////////////  CART METHODS /////////////////////////////////////////

    getAllCarts() {
        return this.carts
    }

    addCart( newCartData ) {
        let id = this.carts.length + 1

        let { timeStamp, products } = newCartData

        let newCart = new Cart(id, timeStamp, products)
        this.carts.push(newCart)

        let result = this.saveInFile()
        if( result === 1) {
            //if saving in file fails the cart gets deleted from the carts' local list
            this.deleteCart(id)
            return undefined
        } else {
            //if cart is saved in file its id gets returned
            return newCart.id
        }
    }

    findCart(id) {
        //Finds cart by id in carts array -- returns cart or undefined
        return this.carts.find( cart => cart.id === id );
    }

    cartExists(id){
        //Returns boolean indicating if cart id exists in carts array  -- returns true or false
        return this.findProduct(id) != undefined
    }

    updateCart(id, data) {
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

    deleteCart(id) {
        //Deletes product by id from products list and file
        let searchedCart = this.findProduct(id)

        if( searchedCart === undefined ) {
            return undefined
        } 

        let index = this.products.indexOf(searchedCart)
        this.products.splice(index,1)

        let result = this.saveInFile()
        if( result === 1) {
            //if saving in file fails the cart gets added back to carts list
            this.addCart(searchedCart)
            return undefined
        } else {
            //if cart is deleted the return is the cart
            return searchedCart
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////// PRODUCTS IN CART METHODS ////////////////////////////////

    getCartProducts(id) {
        const searchedCart = this.findCart(id)
        if( searchedCart != undefined ) {
            return searchedCart.getProducts()
        } else {
            return undefined
        }
    }

    addProductToCart(cartID,product) {
       //Adds a product to the products array and saves it in file -- returns undefined or product's id

       const searchedCart = this.findCart(cartID)

       if( searchedCart != undefined ) {
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
       } else {
            return undefined
       }
    }

    findProductInCart( cartID, productID ) {
        //Finds product by id in products array -- returns product or undefined
        const searchedCart = this.findCart(cartID)

        if( searchedCart != undefined ) {
            return searchedCart.findProductInCart(productID)
        } else {
            return undefined
        }
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

    deleteProductFromCart(cartID, productID) {
        //Deletes product by id from products list and file

        const searchedCart = this.findCart(cartID)

        if( searchedCart != undefined ) {
            let searchedProduct = this.findProductInCart(cartID, productID)

            if( searchedProduct === undefined ) {
                return undefined
            } 

            let index = this.products.indexOf(searchedProduct)
            this.products.splice(index,1)

            let result = this.saveInFile()
            if( result === 1) {
                //if saving in file fails the product gets added back to products list
                this.addProductToCart(cartID,searchedProduct)
                return undefined
            } else {
                //if product is deleted the return is the product
                return searchedProduct
            }
        } else {
            return undefined
        }


        
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////// FILE METHODS //////////////////////////////////////////

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
            await fs.promises.writeFile(this.filename, JSON.stringify(this.carts,null,2));
            return 0
        } catch (error) {
            console.log(`Error Code: ${error.code} | There was an error trying to save the file`);
            return 1
        }
    }
}

module.exports = CartContainer;