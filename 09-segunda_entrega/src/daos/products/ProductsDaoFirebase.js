import FirebaseContainer from "../../contenedores/FirebaseContainer.js"

class ProductsDaoFirebase extends FirebaseContainer {

    constructor() {
        super('products')
    }
}

export default ProductsDaoFirebase
