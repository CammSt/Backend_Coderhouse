import admin from "firebase-admin"
import { v4 as uuidv4 } from 'uuid'

import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class FirebaseContainer {

    constructor( collectionName ) {
        this.collection = db.collection(collectionName)
    }

    async addItem( data ) {
        try {

            let id = uuidv4()
            let doc = this.collection.doc(id)
            await doc.create( data )
        
            return id

        } catch (error) {
            console.log(`[ FireBaseContainer - addItem ] -- ${error}`)
            return undefined
        }
    }


    async getByID( id ) {

        try {
            const doc = await this.collection.doc(id).get();

            if ( !doc.exists ) return undefined
            else {
                const data = doc.data();
                return { ...data, id }
            }

        } catch (error) {
            console.log(`[ FireBaseContainer - getByID ] -- ${error}`)
            return undefined
        }
    }

    async getAll() {

        try {

            const querySnapShot = await this.collection.get()
            let docs = querySnapShot.docs

            const result = docs.map( doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })

            return result

        } catch (error) {
            
            console.log(`[ FireBaseContainer - getAll ] -- ${error}`)
            return undefined
        }
    }


    async update( id, data ) {

        try {

            const actualizado = await this.collection.doc(id).set(data);
            return actualizado

        } catch (error) {
            console.log(`[ FireBaseContainer - update ] -- ${error}`)
        }
    }

    async delete( id ) {

        try {

            const item = this.collection.doc(id).delete()
            return item

        } catch (error) {
            console.log(`[ FireBaseContainer - delete ] -- ${error}`)
            return undefined
        }
    }

    async disconnect() {
    }
}

export default FirebaseContainer