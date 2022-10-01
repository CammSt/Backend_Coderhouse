(function () {

	let mensajes = [];
	const formMessage = document.getElementById('form-message');
	const inputMessage = document.getElementById('input-message');
	const inputUser = document.getElementById('input-user');
	const showMessage = document.getElementById('show-message');

	const socket = io();

	/* inputMessage.addEventListener('keyup', (event) => {
		socket.emit('nuevo-mensaje', event.target.value);
	}) */

	function updateMessages(messages = []) {
		showMessage.innerText = '';
		messages.forEach((data) => {
		const item = document.createElement('li');
		item.innerText = `${data.socketID} -> ${data.mensaje}`;
		showMessage.appendChild(item);
		})
	}

	formMessage.addEventListener('submit', (event) => {
		event.preventDefault();
		socket.emit('nuevo-mensaje', inputMessage.value);
		inputMessage.value = '';
		inputMessage.focus();
	})

	socket.on('connect', () => {
		console.log('Conectados al servidor');
	});

	socket.on('inicio', (data) => {
		mensajes = data;
		updateMessages(mensajes);
	});

	socket.on('notificacion', (data) => {
		mensajes.push(data);
		updateMessages(mensajes);
	});
    
})();