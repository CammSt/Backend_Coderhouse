const fs = require('fs')

class Contenedor {

    constructor( archivo ) {

        this.archivo = archivo
    } 

    async fileExists() {
        try {   
            return fs.existsSync(`./${this.archivo}`)
        } catch (error) {
            console.log("error ", error);
        }
    }   

    async readFile() {
        try { 
            const data = await fs.promises.readFile(`./${this.archivo}`,'utf-8')
            return JSON.parse(data)

        } catch (error) {
            console.log("error ", error);
        }
    }

    async writeFile(content) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`,JSON.stringify(content,null,2), 'utf-8')
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async save(itemToSave) {
        //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado

        let auxItem = itemToSave

        if( await this.fileExists() === false ) {

            let productos = []
            auxItem.id = 0
            productos.push(auxItem)

            await this.writeFile(productos)

        } else {

            let data = await this.readFile()
            
            auxItem.id = data[data.length - 1].id + 1
            data.push(auxItem)

            await this.writeFile(data)
        }        
        return auxItem.id
    }   
    
    async getById(searchedId) {
        //Recibe un id y devuelve el objeto con ese id, o null si no está

        if( await this.fileExists() === false ) { 
            return null
        } else {
            let data = await this.readFile() 

            let searchedItem = data.find( item => item.id.toString() === searchedId.toString() )

            if( !searchedItem ) return null

            return searchedItem
        }
    }
    
    async getAll() {
        //Devuelve un array con los objetos presentes en el archivo

        if( await this.fileExists() === false ) { 
            return []
        } else {
            let data = await this.readFile() 
            return data
        }

    }
    
    async deleteById(idToDelete) {
        //Elimina del archivo el objeto con el id buscado
        if( await this.fileExists() === false ) { 
            return
        } else {
            let data = await this.readFile() 

            let searchedItem = data.find( item => item.id.toString() === idToDelete.toString() )
            let searchedItemIndex = data.indexOf(searchedItem)

            if( searchedItemIndex === -1 ) return

            data.splice(searchedItemIndex,1)
            await this.writeFile(data)
        }
    }

    async deleteAll() {
        //Elimina todos los objetos presentes en el archivo.
        if( await this.fileExists() === false ) { 
            return
        } else {
            fs.unlinkSync(`./${this.archivo}`)
        }
    }
}


/* ( async function() {
   
    const contenedor = new Contenedor('productos.txt')

    let saveObject1 = {
        title: 'Escuadra',                                                                                                                                 
        price: 123.45,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    }

    let saveObject2 = {
        title: 'Calculadora',                                                                                                                              
        price: 234.56,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    }

    console.log("El id del elemento agregado es: ", await contenedor.save(saveObject1));
    console.log("El id del elemento agregado es: ", await contenedor.save(saveObject2));
    console.log("El objeto de id 4 es: ", await contenedor.getById(4));
    console.log("Los productos cargados en el archivo son ", await contenedor.getAll() );
    await contenedor.deleteById(0) 
    await contenedor.deleteAll()

})() */

module.exports = Contenedor;