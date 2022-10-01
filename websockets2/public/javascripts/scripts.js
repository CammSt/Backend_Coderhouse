
(function () {

	const formMessage = document.getElementById('form-message');
	const inputMessage = document.getElementById('input-message');
	const inputUser = document.getElementById('input-user');
	const showMessage = document.getElementById('show-message');

	const socket = io();

	socket.emit('inicio')

	
	formMessage.addEventListener('submit', (event) => {

		event.preventDefault();

		let todayDate = new Date()
		let today = todayDate.getDay() + '/' + todayDate.getMonth() + '/' + todayDate.getFullYear()
		let time = todayDate.getHours() + ':' + todayDate.getMinutes() + ':' + todayDate.getSeconds()

		let messageData = {
			user: inputUser.value,
			message : inputMessage.value,
			date : today,
			time: time
		}

		socket.emit('nuevo-mensaje', messageData);
		inputMessage.value = '';
		inputMessage.focus();
	})
	
	function updateMessages(messages = []) {
		showMessage.innerText = '';

		messages.forEach((data) => {

			const item = document.createElement('li')

			item.innerHTML = `
				<div class='messageContainer'>
					<div class='messageFirstRow'> 
						<div class='messageUser'>${data.user}</div>

						<div class='dateContainer'>
							<div class='messageDate'>${data.date}</div>
							<div class='messageDate'>${data.time}</div>
						</div>
					</div>

					<div class='messageText'>${data.message}</div>
					
				</div>
			`
			showMessage.appendChild(item);
		})
	}

	socket.on('connect', () => {
		console.log('Connected to server');
	});

	socket.on('inicio', (data) => {
		mensajes = data;
		updateMessages(mensajes);
	});

	socket.on('notificacion', (data) => {
		console.log("entro a socket.on notification");
		mensajes.push(data);
		updateMessages(mensajes);
	});
    
})();