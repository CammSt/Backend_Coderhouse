const fs = require("fs");

class Cart {

    constructor( id, timestamp ) {
        this.products = [],
        this.id = id,
        this.timestamp = timestamp
    }

    async getCartProducts() {
        return this.products
    }

    addProduct(product) {
        this.products.push(product)
        this.saveInFile()
    }

    findProduct(id) {
        return this.products.find( producto => producto.id === id );
    }

    productExists(id){
        return this.findProduct(id) != undefined
    }

    updateProduct(id, data) {
        let searchedProduct = this.findProduct(id)
        searchedProduct.updateProduct(data)

        this.saveInFile()
        return this.products[index]
    }

    deleteProduct(id) {
        let searchedProduct = this.findProduct(id)
        let index = this.products.indexOf(searchedProduct)
        this.products.splice(index,1)
        this.saveInFile()
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
        } catch (error) {
            console.log(`Error Code: ${error.code} | There was an error trying to save the product`);
        }
    }
}

module.exports = Cart;