class User {

    constructor( nombre, apellido, libros, mascotas ) {

        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    } 


    getFullName() {
        let fullName = this.nombre + ' ' + this.apellido
        return fullName
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        return this.mascotas.length
    } 

    addBook(libro, autor) {
        let nuevoLibro = { autor: autor, nombre: libro}
        this.libros.push(nuevoLibro)
    }

    getBookNames() {
        let nombresLibros = this.libros.map( libro => {
            return libro.nombre
        }) 
        return nombresLibros
    }

}


( function() {
    let nombre = 'Camila'
    let apellido = 'Stahl'
    let libros = [
        {
            autor: 'George R.R',
            nombre: 'Juego de tronos'
        },
        {
            autor: 'J. K. Rowling',
            nombre: 'Harry Potter'
        },
        {
            autor: 'Antoine de Saint-Exupéry',
            nombre: 'El principito'
        }
    ]

    let mascotas = ['perro','gato','huron','tortuga']

    const user = new User(nombre, apellido, libros, mascotas)

    console.log("Nombre completo: ",user.getFullName())

    user.addMascota('hamster')
    console.log("Cantidad de mascotas ",user.countMascotas());

    user.addBook('La Odisea','Homero')

    console.log("Nombres de los libros ",user.getBookNames());

})()