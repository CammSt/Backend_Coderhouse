

class MemoryContainer {

    constructor() {
        this.items = []
    }

    getAll(  ) {
        return [...this.items]
    }

    getByID( id ) {
        const result = this.items.find( item => item.id === Number(id) )
        return result
    }


    addItem( data ) {

        let newId

        if (this.items.length == 0) {
            newId = 1
        } else {
            newId = this.items[this.items.length - 1].id + 1
        }

        const itemToAdd = { ...data, id: Number(newId) }
        this.items.push(itemToAdd)
        return itemToAdd
    }

    update( id, data ) {
        const index = this.items.findIndex( item => item.id === Number(id) )

        if (index == -1) {
            return undefined
        } else {

            data.id = this.items[index]['id']
            data.timestamp = this.items[index]['timestamp']

            this.items[index] = data
            return data
        }
    }

    delete( id ) {

        const index = this.items.findIndex(elem => elem.id === Number(id))

        if (index == -1) {
            return undefined
        } else {
            return this.items.splice(index, 1)
        }
    }
}

export default MemoryContainer
