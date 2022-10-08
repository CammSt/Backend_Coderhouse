/* El carrito de compras tendrá la siguiente estructura: 
id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
El timestamp puede implementarse con Date.now() */

class Cart {

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
}