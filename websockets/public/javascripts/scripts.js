
( function () {

	const socket = io();

	const formMessage = document.getElementById('form-message');
	
	const inputMessage = document.getElementById('input-message');
	const inputEmail = document.getElementById('input-email');
	const chatHistory = document.getElementById('chatHistory')

	const formProduct = document.getElementById('form-product');
	
    const inputTitle = document.getElementById('input-title');
	const inputPrice = document.getElementById('input-price');
	const inputImage = document.getElementById('input-image');

	formMessage.addEventListener('submit', (evt) => {
		evt.preventDefault();

		const email = inputEmail.value;
		const message = inputMessage.value;
		
		if (email !== '' && message !== '') {

			let date_time = new Date().toLocaleString()
			let date_time_split = date_time.split(", ")
		
			socket.emit('newMessage', {
				"email" : email,
				"message" : message,
				"date" : date_time_split[0],
				"time": date_time_split[1]
			})
		}
	})
	
	formProduct.addEventListener('submit', (evt) => {
		evt.preventDefault();

		const title = inputTitle.value;
		const price = inputPrice.value;
		const image = inputImage.value;

		if (title !== '' && price !== '' && image !== '') {
			socket.emit('newProduct',{
				"title": title,
				"price": parseInt(price),
				"thumbnail": image
			})
		}
	})

	/* socket.on('firstLoadProducts', (data) => {
		let productsTableBody = document.getElementById("productsTableBody")
		productsTableBody.innerText = '';

		let auxdata = JSON.parse(data)

		auxdata.forEach((product) => {

			const item = document.createElement('tr')

			item.innerHTML = `
				<th scope="row">${product.id}</th>
				<td> <img src=${product.thumbnail} class='tableImage'></td>
				<td>${product.title}</td>
				<td>$ ${product.price}</td>
			`
			productsTableBody.appendChild(item);
		}) 
	}) */

	/* socket.on("firstLoadProducts", (products) => {
        fetch("/javascripts/templates/form.hbs")
            .then(template => template.text())
            .then(text => {
				let productsTableBody = document.getElementById("productsTableBody")
                const template = Handlebars.compile(text)
                products.forEach(el => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = template(el)
                    productsTableBody.appendChild(tr)
                })      
            })
    }) */

	socket.on('firstLoadMessages', (data) => {
		chatHistory.innerText = '';

		data.forEach((message) => {

			const item = document.createElement('li')
	
			item.innerHTML = `
				<div class='messageContainer'>
					<div class='messageFirstRow'> 
						<div class='messageUser'>${message.email}</div>
	
						<div class='dateContainer'>
							<div class='messageDate'>${message.date}</div>
							<div class='messageDate'>${message.time}</div>
						</div>
					</div>
	
					<div class='messageText'>${message.message}</div>
					
				</div>
			`
			chatHistory.appendChild(item);
		})
	})
	
	socket.on('updateMessages', (data) => {
		chatHistory.innerText = '';

		data.forEach((message) => {

			const item = document.createElement('li')
	
			item.innerHTML = `
				<div class='messageContainer'>
					<div class='messageFirstRow'> 
						<div class='messageUser'>${message.email}</div>
	
						<div class='dateContainer'>
							<div class='messageDate'>${message.date}</div>
							<div class='messageDate'>${message.time}</div>
						</div>
					</div>
	
					<div class='messageText'>${message.message}</div>
					
				</div>
			`
			chatHistory.appendChild(item);
		})
	})
	
	socket.on('updateProducts', (data) => {
		let productsTableBody = document.getElementById("productsTableBody")
		productsTableBody.innerText = '';

		let auxdata = JSON.parse(data)

		auxdata.forEach((product) => {

			const item = document.createElement('tr')

			item.innerHTML = `
				<th scope="row">${product.id}</th>
				<td> <img src=${product.thumbnail} class='tableImage'></td>
				<td>${product.title}</td>
				<td>$ ${product.price}</td>
			`
			productsTableBody.appendChild(item);
		}) 
	})
})();