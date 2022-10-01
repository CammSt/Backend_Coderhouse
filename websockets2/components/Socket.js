const { Server } = require('socket.io')
const ChatContainer = require('../components/ChatContainer')
const chat = new ChatContainer('chat.json')

let io

class Socket {

	//por ser static no hace falta instanciar la clase
	static init(httpServer) {

		io = new Server(httpServer)
		io.on('connection', (socketClient) => {
			console.log(" 🟢 Se CONECTO un nuevo cliente con el id ", socketClient.id);
            
            const mensajes = chat.getAll();
            socketClient.emit('inicio', mensajes)

            socketClient.on('nuevoMensaje', async(data) => {
                await chat.save(data);
                
                const mensajes = await chat.getAll();
                io.sockets.emit('listaMensajesActualizada', mensajes)
            })

			

			socketClient.on('nuevo-mensaje', (data) => {
				mensajes.push({ user: data.user, message: data.message, date: data.date, time: data.time })
				io.sockets.emit('notificacion', { user: data.user,  message: data.message, date: data.date, time: data.time })
			})
            
			socketClient.on('diconnection', () => {
				console.log("🔴 Se DESCONECTO un nuevo cliente con el id ", socketClient.id);
			})
		})
	}
}

module.exports = Socket


/* io.on('connection', async(socket) => {
    console.log('🟢 Usuario conectado')
    
    const productos = await contenedor.getAll();
    socket.emit('bienvenidoLista', productos )
    
    const mensajes = await chat.getAll();
    socket.emit('listaMensajesBienvenida', mensajes)
    
    socket.on('nuevoMensaje', async(data) => {
        await chat.save(data);
        
        const mensajes = await chat.getAll();
        io.sockets.emit('listaMensajesActualizada', mensajes)
    })

    socket.on('productoAgregado', async(data) => {
        console.log('Alguien presionó el click')
        await contenedor.save(data);
        
        const productos = await contenedor.getAll();
        io.sockets.emit('listaActualizada', productos);
    })
    
    socket.on('disconnect', () => {
        console.log('🔴 Usuario desconectado')
    })
*/