const { Server } = require('socket.io')
const ChatContainer = require('../components/ChatContainer')
const chat = new ChatContainer('chat.json')

let io

class Socket {

	//por ser static no hace falta instanciar la clase
	static init(httpServer) {

		io = new Server(httpServer)
		io.on('connection', async (socketClient) => {
			console.log(" 🟢 Se CONECTO un nuevo cliente con el id ", socketClient.id);
            
            let mensajes = await chat.getAll();

            socketClient.emit('inicio', mensajes)

			socketClient.on('nuevo-mensaje', async (data) => {
                chat.addMessage(data)

                mensajes = await chat.getAll();
				socketClient.emit('notificacion', { user: data.user,  message: data.message, date: data.date, time: data.time })
			})
            
			socketClient.on('diconnection', () => {
				console.log("🔴 Se DESCONECTO un nuevo cliente con el id ", socketClient.id);
			})
		})
	}
}

module.exports = Socket