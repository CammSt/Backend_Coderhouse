/* 
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

const server = app.listen(PORT, function() {
    console.log(` >>>>> 🚀 Server started at http://localhost:${server.address().port}<<<<<`)
})
  
app.use((error, request, response, next) => {
    
    if(error.statusCode){
        return response.status(error.statusCode).send(`Error ${error.statusCode}`)
    }
    console.log(error)
    response.status(500).json({error: "Something broke..."})
})


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
 */


import FirebaseAdmin from 'firebase-admin'
import { readFile } from 'fs/promises';

import { v4 as uuidv4 } from 'uuid'

const cert = JSON.parse(
	await readFile(
		new URL('./db-config/coderhousebackend-5e185-firebase-adminsdk-sx3mp-b878834c19.json', import.meta.url)
	)
)

FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(cert)
});

console.log("Conectado a FireBase!");


async function createFirebaseData () {

    try {

        const firebaseDB = FirebaseAdmin.firestore()
        const query = firebaseDB.collection('users') //COLLECTION NAME

        let id = uuidv4()
        let doc = query.doc(id)
        await doc.create( { nombre: 'Paola Ramos', edad: 25 } ) //DATA PARA AGREGAR


        id = uuidv4()
        doc = query.doc(id)
        await doc.create( { nombre: 'Mariana Banana', edad: 30 } ) //DATA PARA AGREGAR


        id = uuidv4()
        doc = query.doc(id)
        await doc.create( { nombre: 'Romina Morillo', edad: 19 } ) //DATA PARA AGREGAR


        id = uuidv4()
        doc = query.doc(id)
        await doc.create( { nombre: 'Agustina García', edad: 40 } ) //DATA PARA AGREGAR

        console.log("Usuarios creados con exito");

    } catch (error) {
        console.log("error en la funcion createFirebaseData ", error.message);
    }

}

async function readAllFirebaseData() {
 
    try {

        const firebaseDB = FirebaseAdmin.firestore()
        const query = firebaseDB.collection('users') //COLLECTION NAME

        const querySnapShot = await query.get()
        let docs = querySnapShot.docs

        const response = docs.map( doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        console.log("Usuarios obtenidos ", response);

    } catch (error) {
        console.log("error en la funcion readAllFirebaseData ", error.message);
    }
}


async function readByIDFirebaseData(id) {

    try {

        const firebaseDB = FirebaseAdmin.firestore()
        const query = firebaseDB.collection('users') //COLLECTION NAME

        const doc = query.doc(id)

        const item = await doc.get()
        const response = item.data()

        if(response) {
            console.log("Usuario obtenido por ID ", response);
        } else {
            console.log("Usuario no encontrado");
        }
        
    } catch (error) {
        console.log("error en la funcion readByIDFirebaseData ", error.message);
    }
}

async function updateByIDFirebaseData(id,data) {

    try {

        const firebaseDB = FirebaseAdmin.firestore()
        const query = firebaseDB.collection('users') //COLLECTION NAME

        const doc = query.doc(id)

        const item = await doc.update(data)

        console.log("Usuario actualizado ", item);

    } catch (error) {
        console.log("error en la funcion updateByIDFirebaseData ", error.message);
    }
}

async function deleteByIDFirebaseData(id,data) {

    try {

        const firebaseDB = FirebaseAdmin.firestore()
        const query = firebaseDB.collection('users') //COLLECTION NAME

        const doc = query.doc(id)

        const item = await doc.delete()

        console.log("Usuario eliminado ", item);

    } catch (error) {
        console.log("error en la funcion deleteByIDFirebaseData ", error.message);
    }
}

await deleteByIDFirebaseData('f617ae9e-0f99-496c-b643-703bc3a43a7b') 