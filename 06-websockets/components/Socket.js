const { Server } = require('socket.io')
const ChatContainer = require('../components/ChatContainer')
const ProductsContainer = require('./ProductsContainer')
const chat = new ChatContainer('chat.json')
const product = new ProductsContainer('products.json')

let io

class Socket {
	
	static init(httpServer) {  //por ser static no hace falta instanciar la clase
		io = new Server(httpServer)

		io.on('connection', async (socket) => {
			console.log("\n 🟢  Client connected\n");
			
			let products = await product.getAll()

			if(products.length != 0) {
				socket.emit('firstLoadProducts', products )
			}

			const messages = await chat.getAll();
			if(messages.length != 0) {
				socket.emit('firstLoadMessages', messages)
			}

			socket.on('newProduct', async(data) => {
				await product.save(data);
				io.sockets.emit('updateProducts', data);
			})

			socket.on('newMessage', async(data) => {
				await chat.save(data);
				io.sockets.emit('updateMessages', data)
			})

			socket.on('disconnect', () => {
				console.log("\n 🔴  Client disconnected\n");
			})
		});
	}
}

module.exports = Socket
