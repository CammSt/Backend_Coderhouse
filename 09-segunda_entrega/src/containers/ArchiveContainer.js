import { promises as fs } from 'fs'
import config from '../config.js'

class ArchiveContainer {

    constructor(path) {
        this.path = `${config.fileSystem.path}/${path}`;
        this.createFile()
    }

    async createFile() {
      
        fs.writeFile(this.path, "[]", (error) => {
            if( error ) {
                console.log(error)
            } else {
                console.log(`File ${this.filename} was created`);
            }
        })
        
    }

    async getAll() {
        try {
            const allData = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(allData)

        } catch (error) {
            console.log(`[ ArchiveContainer - getAll ] -- ${error}`)
            return undefined
        }
    }

    async getByID( id ) {

        const allData = await this.getAll()
        const index = allData.findIndex( item => item.id === Number(id) )

        if( index === -1 ) {
            return undefined
        }

        return allData[index]
    }

    async addItem( data ) {

        const allData = await this.getAll()

        let newId
        if( allData.length == 0 ) {
            newId = 1
        } else {
            newId = allData[allData.length - 1].id + 1
        }

        const addedData = { ...data, id: newId }
        allData.push(addedData)

        try {
            await fs.writeFile(this.path, JSON.stringify(allData, null, 2))
            return addedData
        } catch (error) {
            console.log(`[ ArchiveContainer - addItem ] -- ${error}`)
            return undefined
        }
    }

    async update( id, data ) {

        const allData = await this.getAll()

        const index = allData.findIndex( item => item.id === Number(id) )

        if (index == -1) {
           return undefined

        } else {
            data.id = Number(id)
            data.timestamp = allData[index]['timestamp']
            allData[index] = data

            try {
                await fs.writeFile(this.path, JSON.stringify(allData, null, 2))
                return data
            } catch (error) {
                console.log(`[ ArchiveContainer - update ] -- ${error}`)
                return undefined
            }
        }
    }

    async delete( id ) {

        const allData = await this.getAll()
        const index = allData.findIndex( item => item.id === Number(id) )

        if (index === -1) {
            return undefined
        }

        allData.splice(index, 1)
        try {
            await fs.writeFile(this.path, JSON.stringify(allData, null, 2))
            return id
        } catch (error) {
            console.log(`[ ArchiveContainer - delete ] -- ${error}`)
            return undefined
        }
    }
}


export default ArchiveContainer