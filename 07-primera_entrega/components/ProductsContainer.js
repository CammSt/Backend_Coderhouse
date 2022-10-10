const fs = require("fs");

class ProductsContainer {

    constructor(fileName) {
        this.products = []
        this.filename = fileName
        this.readFileOrCreateOne()
    }

    getProducts() {  //Returns all products
        return this.products
    }

    addProduct(product) {  //Adds a product to the products array and saves it in file -- returns undefined or product's id
        
        let id = this.products.length + 1
        product.id = Number(id)
        product.price = Number(product.price)
        this.products.push(product)

        this.saveInFile()

        return product.id
    }

    findProduct(id) {  //Finds product by id in products array -- returns product or undefined
        return this.products.find( producto => producto.id === Number(id) );
        
    }

    productExists(id){  //Returns boolean indicating if product id exists in products array  -- returns true or false
        return this.findProduct(id) != undefined
    }

    updateProduct(id, data) { //Modify product searched by id in products array and saving it in file  -- returns undefined or product

        let searchedProduct = this.findProduct(id)
        if( searchedProduct === undefined ) {
            return undefined
        }
        
        let index = this.products.indexOf(searchedProduct)

        if( data.timestamp != undefined ) { 
            this.products[index].timestamp = data.timestamp
        }
        if( data.title != undefined ) { 
            this.products[index].title = data.title
        }
        if( data.price != undefined ) { 
            this.products[index].price = data.price
        }
        if( data.description != undefined ) { 
            this.products[index].description = data.description
        }
        if( data.code != undefined ) { 
            this.products[index].code = data.code
        }
        if( data.stock != undefined ) { 
            this.products[index].stock = data.stock
        }
        if( data.image != undefined ) { 
            this.products[index].image = data.image
        }
        
        this.saveInFile()
       
        return this.products[index]
    }

    deleteProduct(id) {  //Deletes product by id from products list and file

        let searchedProduct = this.findProduct(id)
        if( searchedProduct === undefined ) {
            return undefined
        } 

        let index = this.products.indexOf(searchedProduct)
        this.products.splice(index,1)
        this.saveInFile()
        
        return searchedProduct
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
            console.log(`Error Code: ${error.code} | There was an error trying to save the file`);
        }
    }
}

module.exports = ProductsContainer;