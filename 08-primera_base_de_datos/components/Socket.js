const { Server } = require('socket.io');
const dbController = require('../db/dbController');

const knexConfig = require('../db/knexConfig') 

const db = new dbController('products', knexConfig )

let io

class Socket {
	
	static init(httpServer) { 
		io = new Server(httpServer)

		io.on('connection', async (socket) => {
			console.log("\n 🟢  Client connected\n");
			
			let products = await db.getAll( 'knex', 'products' )
			if(products.length != 0) {
				socket.emit('firstLoadProducts', products )
			}

			const messages = await db.getAll( 'sqlite', 'messages' )
			if(messages.length != 0) {
				socket.emit('firstLoadMessages', messages)
			}

			socket.on('newProduct', async(data) => {
				await db.saveInTable( data, 'knex', 'products' );
				io.sockets.emit('updateProducts', data);
			})

			socket.on('newMessage', async(data) => {
				await db.saveInTable( data, 'sqlite', 'messages' );
				io.sockets.emit('updateMessages', data)
			})

			socket.on('disconnect', () => {
				console.log("\n 🔴  Client disconnected\n");
			})
		});
	}
}

module.exports = Socket
