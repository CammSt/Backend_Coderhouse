const { Server } = require('socket.io')
const ChatContainer = require('../components/ChatContainer')
const ProductsContainer = require('./ProductsContainer')
const chat = new ChatContainer('chat.json')
const product = new ProductsContainer('products.json')

let io

class Socket {

	
	static init(httpServer) {  //por ser static no hace falta instanciar la clase

		io = new Server(httpServer)

		io.on('connection', async(socket) => {
			console.log("\n 🟢  Client connected\n");
			
			const products = await product.getAll();
			socket.emit('firstLoadProducts', products )
			
			const messages = await chat.getAll();
			socket.emit('firstLoadMessages', messages)
			
			socket.on('newMessage', async(data) => {
				await chat.save(data);
				const messages = await chat.getAll();
				io.sockets.emit('updateMessages', messages)
			})
		
			socket.on('newProduct', async(data) => {
				await product.save(data);
				const products = await product.getAll();
				io.sockets.emit('updateProducts', products);
			})
			
			socket.on('disconnect', () => {
				console.log("\n 🔴  Client disconnected\n");
			})
		})
	}
}

module.exports = Socket