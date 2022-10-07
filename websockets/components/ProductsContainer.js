const fs = require("fs");

class ProductsContainer {

    constructor(fileName) {
        this.products = []
        this.filename = fileName
        this.readFileOrCreateOne()
    }

    async getProducts() {
        return this.products
    }

    addProduct(product) {
        product.id = this.products.length + 1;
        this.products.push(product)
        product.price = Number(product.price)
        this.save(product)
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



    //// ------- FILE METHODS -------- /////

    async readFileOrCreateOne() {
        try {
            await fs.promises.readFile(this.filename, "utf-8");
            let readData = await this.getData()
            
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

    async getData() {
        const data = await fs.promises.readFile(this.filename, "utf-8");
        return data;
    }

    async save(product) {

        try {
            const data = await this.getData();

            if( data.length === 0) {

                const parsedData = [];
                product.id = 1;
                parsedData.push(product)

                await fs.promises.writeFile(this.filename, JSON.stringify(parsedData,null,2));

                return product.id;

            } else { 

                const parsedData = JSON.parse(data);

                product.id = parsedData.length + 1;
                parsedData.push(product);
    
                await fs.promises.writeFile(this.filename, JSON.stringify(parsedData,null,2));
                return product.id;
            }


        } catch (error) {
            console.log(`Error Code: ${error.code} | There was an error trying to save the product`);
        }
    }

    async getById(id) {
        id = Number(id);
        try {
          const data = await this.getData();
          const parsedData = JSON.parse(data);
    
          return parsedData.find((producto) => producto.id === id);
        } catch (error) {
          console.log( `Error Code: ${error.code} | There was an error when trying to get the element with ID: ${id}` );
        }
      }
    
    async deleteById(id) {
        try {

            id = Number(id);
            const data = await this.getData();
            const parsedData = JSON.parse(data);

            const objectIdToBeRemoved = parsedData.find( product => product.id === id);

            if (objectIdToBeRemoved) {
                const index = parsedData.indexOf(objectIdToBeRemoved);
                parsedData.splice(index, 1);

                await fs.promises.writeFile(this.filename, JSON.stringify(parsedData,null,2));
                return true;
                
            } else {
                console.log(`The product with ID ${id} does not exist`);
                return null;
            }
        } catch (error) {
            console.log( `Error Code: ${error.code} | There was an error when trying to delete the element with ID: ${id}` );
        }
    }

    async updateById(id, newData) {
        try {
            id = Number(id);
            const data = await this.getData();
            const parsedData = JSON.parse(data);
            const objectIdToBeUpdated = parsedData.find( product => product.id === id );
            
            if (objectIdToBeUpdated) {
                const index = parsedData.indexOf(objectIdToBeUpdated);
                const {title, price, thumbnail} = newData;

                parsedData[index]['title'] = title;
                parsedData[index]['price'] = price;
                parsedData[index]['thumbnail'] = thumbnail;

                await fs.promises.writeFile(this.filename, JSON.stringify(parsedData));

                return true;
            } else {
                console.log(`The product with ID ${id} does not exist`);
                return null;
            }

        } catch (error) {
            `Error Code: ${error.code} | There was an error when trying to update the element with ID: ${id}`
        }
    }
    
    async deleteAll() {
        try {
            await this.createEmptyFile();
        } catch (error) {
            console.log(`There was an error (${error.code}) when trying to delete all the products`);
        }
    }
    
    async getAll() {
        const data = await this.getData();
        if(data.length != 0) return JSON.parse(data)
        else return []
    }
}

module.exports = ProductsContainer;