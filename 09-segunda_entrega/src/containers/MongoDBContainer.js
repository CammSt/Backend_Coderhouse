import mongoose from 'mongoose'
import config from '../config.js'
import { asPOJO, renameField, removeField } from '../utils/objectUtils.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class MongoDBContainer {

    constructor( collectionName, schema ) {
        this.collection = mongoose.model( collectionName, schema )
    }

    async getByID( id ) {

        try {

            const docs = await this.collection.find({ '_id': id }, { __v: 0 })
            
            if (docs.length == 0) {
                return undefined
            } else {
                const result = renameField(asPOJO(docs[0]), '_id', 'id')
                return result
            }

        } catch (error) {
            console.log(`[ MongoDBContainer - getByID ] -- ${error}`)
            return undefined
        }
    }

    async getAll() {

        try {
            
            let docs = this.collection.find({})
            return docs

        } catch (error) {
            console.log(`[ MongoDBContainer - getAll ] -- ${error}`)
            return undefined
        }
    }

    async addItem( data ) {

        try {

            let doc = await this.collection.create(data);
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return doc
            
        } catch (error) {
            console.log(`[ MongoDBContainer - addItem ] -- ${error}`)
            return undefined
        }
    }

    async update( id, data ) {

        try {
            const { matchedCount,modifiedCount } = await this.collection.updateOne({ '_id': id }, {$set: data})

            if ( (modifiedCount === 0) || (matchedCount === 0) ) {
                return undefined

            } else {
                data.id = id
                removeField(data, '__v')
                return data
            }

        } catch (error) {
            console.log(`[ MongoDBContainer - update ] -- ${error}`)
            return undefined
        }
    }

    async delete( id ) {

        try {
            const { deletedCount } = await this.collection.deleteOne({ '_id': id })

            if ( deletedCount === 0 ) {
                return undefined
            } else {
                return id
            }

        } catch (error) {
            console.log(`[ MongoDBContainer - delete ] -- ${error}`)
            return undefined
        }
    }
}

export default MongoDBContainer