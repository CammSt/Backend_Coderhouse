const fs = require("fs");


class ChatContainer {

    constructor(fileName) {
        this.messages = []
        this.filename = fileName
        this.readFileOrCreateOne()
    }

    async getMessages() {
        return this.messages
    }

    addMessage(message) {
        product.id = this.messages.length + 1;
        this.messages.push(message)
        message.price = Number(message.price)
        this.save(message)
    }

    //// ------- FILE METHODS -------- /////

    async readFileOrCreateOne() {
        try {
          await fs.promises.readFile(this.filename, "utf-8");
          this.messages = JSON.parse(await this.getAll()) 

          console.log("messages ", this.messages);

        } catch (error) {
            console.log("error ", error);

            if( error.code === "ENOENT" ) {
                this.createEmptyFile()
            } else {
                console.log( `Error: ${error.code} | Could not read file: ${this.filename}` )
            }
        }
    }

    async createEmptyFile() {
        fs.writeFile(this.filename, "[]", (error) => {
            if( error ) {
                console.log(error)
            } else {
                console.log(`File ${this.filename} was created`);
            }
        })
    }

    async getAll() {
        const data = await fs.promises.readFile(this.filename, "utf-8");
        return data;
    }

    async save(message) {

        try {
            const data = await this.getAll();

            if( data.length === 0) {

                const parsedData = [];
                message.id = 1;
                parsedData.push(message)

                await fs.promises.writeFile(this.filename, JSON.stringify(parsedData,null,2));

                return message.id;

            } else { 

                const parsedData = JSON.parse(data);

                message.id = parsedData.length + 1;
                parsedData.push(message);
    
                await fs.promises.writeFile(this.filename, JSON.stringify(parsedData,null,2));
                return message.id;
            }


        } catch (error) {
            console.log(`Error Code: ${error.code} | There was an error trying to save the message`);
        }
    }
    
    async deleteAll() {
        try {
            await this.createEmptyFile();
        } catch (error) {
            console.log(`There was an error (${error.code}) when trying to delete all the messages`);
        }
    }
}

module.exports = ChatContainer;