
class Product {
    
    constructor( id, timestamp, nombre, descripcion, codigo, foto, precio, stock ) {
        this.id = id,
        this.timestamp = timestamp,
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.codigo = codigo,
        this.foto = foto,
        this.precio = precio,
        this.stock = stock
    }

    updateProduct(data) {
        this.timestamp = data.timestamp
        this.nombre = data.name
        this.descripcion = data.description
        this.codigo = data.code
        this.foto = data.image
        this.precio = data.price
        this.stock = data.stock
    }
}

module.exports = Product
