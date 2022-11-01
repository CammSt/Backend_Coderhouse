
// Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

//  1- Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 
//  2- Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 
//  3- Listar todos los documentos en cada colección.
//  4- Mostrar la cantidad de documentos almacenados en cada una de ellas.


use ecommerce  // crea la base de datos

db.products.insertOne( { title: "Goma de borrar", price: 120, thumbnail: "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_Erase-Eraser-Clean-Remove-256.png" } )

db.products.insertMany( [
    {
        title: "Cuaderno",
        price: 580,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/book-512.png"
    },
    {
        title: "Sacapuntas",
        price: 900,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/education-126/128/24-512.png"
    },
    {
        title: "Lapiz",
        price: 1280,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/flat-pack-1/64/Pencil-512.png"
    },
    {
        title: "Marcador",
        price: 1700,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/graphic-design-filled-line/88/Highlighter_marker_pen_drawing_Highlight-512.png"
    },
    {
        title: "Papel",
        price: 2300,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/paper-clip-academic-note-exam-256.png"
    },
    {
        title: "Anteojos",
        price: 2860,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Glasses-512.png"
    },
    {
        title: "Sobre",
        price: 3350,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/object-emoji/50/Mail-256.png"
    },
    {
        title: "Regla",
        price: 4320,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    },
    {
        title: "Calculadora",
        price: 4990,
        thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
    }
])

db.messages.insertOne({
    message: "Hola1",
    email: "prueba1@gmail.com",
    date: "3/26/2022",
    time: "12:39:17", 
})

db.messages.insertMany([
    {
        message: "Hola2",
        email: "prueba2@gmail.com",
        date: "3/26/2022",
        time: "12:39:17", 
    },
    {
        message: "Hola3",
        email: "prueba3@gmail.com",
        date: "3/26/2022",
        time: "12:39:17", 
    },
    {
        message: "Hola4",
        email: "prueba4@gmail.com",
        date: "3/26/2022",
        time: "12:39:17", 
    },
    {
        message: "Hola5",
        email: "prueba5@gmail.com",
        date: "3/26/2022",
        time: "12:39:17", 
    },
    {
        message: "Hola6",
        email: "prueba6@gmail.com",
        date: "3/26/2022",
        time: "12:39:17", 
    },
    {
        message: "Hola7",
        email: "prueba7@gmail.com",
        date: "3/26/2022",
        time: "12:39:17", 
    },
    {
        message: "Hola8",
        email: "prueba8@gmail.com",
        date: "3/26/2022",
        time: "12:39:17", 
    },
    {
        message: "Hola9",
        email: "prueba9@gmail.com",
        date: "3/26/2022",
        time: "12:39:17", 
    },
    {
        message: "Hola10",
        email: "prueba10@gmail.com",
        date: "3/26/2022",
        time: "12:39:17", 
    }
])


db.products.find()
db.messages.find()

db.products.countDocuments()
db.messages.countDocuments()


/////// PRIMEROS CUATRO ITEMS //////////

// 5- Realizar un CRUD sobre la colección de productos:

    // A- Agregar un producto más en la colección de productos
    // B- Realizar una consulta por nombre de producto específico:
        // i-   Listar los productos con precio menor a 1000 pesos. 
        // ii-  Listar los productos con precio entre los 1000 a 3000 pesos.
        // iii- Listar los productos con precio mayor a 3000 pesos.
        // iv-  Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

    // C- Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100
    // D- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 
    // E- Borrar los productos con precio menor a 1000 pesos 
    
// 6- Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.


db.products.insertOne( { title: "Post it", price: 230, thumbnail: "https://cdn1.iconfinder.com/data/icons/back-to-school-25/128/school-20-512.png" } )

db.products.find({ price: {$lt: 1000} })

db.products.find({ $and: [{ price: { $lt: 1000 } }, { price: { $gt: 1000 } }]  })

db.products.find({ price: {$gt: 3000} })

db.products.find({ price: {$lt: 1000} })

db.products.find({},{ title:1, _id:0 }).sort( { price : 1} ).skip(2).limit(1)

db.products.updateMany({}, { $set: { stock: 100 } }) 


db.products.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } }) 

db.products.deleteMany({ price: { $lt: 1000 } })


////////// USUARIOS Y PERMISOS //////////

use admin

db.createUser({
    user: 'pepe',
    pwd: 'asd456',
    roles: [
        { role: 'read', db: 'ecommerce' }
    ]
})


db.products.updateMany({}, { $set: { stock: 100 } })  // Unauthorized