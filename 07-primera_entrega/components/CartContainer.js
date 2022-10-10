const fs = require("fs");

class CartContainer {

    constructor( filename ) {
        this.filename = filename,
        this.carts = [],
        this.readFileOrCreateOne()
    }


    /////////////////////////////////////  CART METHODS /////////////////////////////////////////

    getAllCarts() {
        return this.carts
    }

    addCart() {
        let id = this.carts.length + 1
        let timeStamp = Date.now()

        let newCart = { id: Number(id), timeStamp: timeStamp, products: [] }
        this.carts.push(newCart)
        this.saveInFile()
        
        return newCart.id
    }

    findCart(id) { //Finds cart by id in carts array -- returns cart or undefined
        return this.carts.find( cart => cart.id === Number(id) );
    }

    cartExists(id){  //Returns boolean indicating if cart id exists in carts array  -- returns true or false
        return this.findCart(id) != undefined
    }

    deleteCart(id) { //Deletes product by id from products list and file
        let searchedCart = this.findCart(id)

        if( searchedCart === undefined ) {
            return undefined
        } 

        let index = this.carts.indexOf(searchedCart)
        this.carts.splice(index,1)

        this.saveInFile()
        return searchedCart
    }


    //////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////// PRODUCTS IN CART METHODS ////////////////////////////////

    getCartProducts(cartID) {
        const searchedCart = this.findCart(cartID)

        if( searchedCart != undefined ) {
            let index = this.carts.indexOf(searchedCart)
            return this.carts[index].products

        } else {
            return undefined
        }
    }

    addProductToCart(cartID,product) {  //Adds a product to the products array and saves it in file -- returns undefined or product's id

        const searchedCart = this.findCart(cartID)

        if( searchedCart != undefined ) {

            let index = this.carts.indexOf(searchedCart)
            product.id = Number(product.id)
            product.price = Number(product.price)
            this.carts[index].products.push(product)

            this.saveInFile()
            
            return product.id
        } else {
            return undefined
        }
    }

    findProductInCart( cartID, productID ) {  //Finds product by id in products array -- returns product or undefined
        const searchedCart = this.findCart(cartID)

        if( searchedCart != undefined ) {
            let index = this.carts.indexOf(searchedCart)
            return this.carts[index].products.find( product => product.id === Number(productID) )

        } else {
            return undefined
        }
    }

    productExistsInCart(id){  //Returns boolean indicating if product id exists in products array  -- returns true or false
        return this.findProduct(id) != undefined
    }

    deleteProductFromCart(cartID, productID) {  //Deletes product by id from products list and file

        const searchedCart = this.findCart(cartID)

        if( searchedCart != undefined ) {

            let cartIndex = this.carts.indexOf(searchedCart)

            let searchedProduct = this.findProductInCart(cartID, productID)

            if( searchedProduct === undefined ) {
                return undefined
            } 

            let productIndex = this.carts[cartIndex].products.indexOf(searchedProduct)
            this.carts[cartIndex].products.splice(productIndex,1)

            this.saveInFile()
            return searchedProduct
            
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
                this.carts = JSON.parse(readData) 
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