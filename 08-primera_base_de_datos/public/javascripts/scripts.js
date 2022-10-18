
( function () {

	const socket = io();

	// Mensajes
	const formMessage = document.getElementById('form-message');
	const inputMessage = document.getElementById('input-message');
	const inputEmail = document.getElementById('input-email');
	const messageOutput = document.getElementById('chatHistory')


	// Productos
	const formProduct = document.getElementById('form-product');
    const inputTitle = document.getElementById('input-title');
	const inputPrice = document.getElementById('input-price');
	const inputImage = document.getElementById('input-image');
	const tableBody = document.getElementById("productsTableBody")

	formMessage.addEventListener("submit", (e) => {
        e.preventDefault();
		
		let date_time = new Date().toLocaleString()
		let date_time_split = date_time.split(", ")

        socket.emit("newMessage", { "email" : inputEmail.value,
									"message" : inputMessage.value,
									"date" : date_time_split[0],
									"time": date_time_split[1] })
	})

	formProduct.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit("newProduct", { "title": inputTitle.value,
									"price": parseInt(inputPrice.value),
									"thumbnail": inputImage.value })
    })
    

	socket.on("firstLoadProducts", (products) => {
        fetch("javascripts/templates/product.hbs")
            .then( template => template.text() )
            .then( text => {
                const template = Handlebars.compile(text)
                products.forEach(el => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = template(el)
                    tableBody.appendChild(tr)
                })      
            })
    })

	socket.on("updateProducts", (data) => {
        fetch("javascripts/templates/product.hbs")
            .then( template => template.text() )
            .then( text => {
                const tr = document.createElement("tr");
                tr.innerHTML = Handlebars.compile(text)(data)
                tableBody.appendChild(tr)
            })
    })

	socket.on("firstLoadMessages", (messages) => {
        fetch("javascripts/templates/message.hbs")
            .then( template => template.text() )
            .then( text => {
                const template = Handlebars.compile(text)
                messages.forEach(el => {
                    const li = document.createElement("li");
                    li.innerHTML = template(el)
                    messageOutput.appendChild(li)
                })      
            })
    })

	socket.on("updateMessages", (data) => {
        fetch("javascripts/templates/message.hbs")
            .then( template => template.text() )
            .then( text => {
                const li = document.createElement("li");
                li.innerHTML = Handlebars.compile(text)(data)
                messageOutput.appendChild(li)
            })
    })

})();