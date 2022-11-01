import app from './server.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT 

const server = app.listen(PORT, () => {
    console.log(` >>>>> 🚀 Server started at http://localhost:${server.address().port}<<<<<`)
})

app.use((error, request, response, next) => {
    
    if(error.statusCode){
        console.log("se rompio aca ", error);
        return response.status(error.statusCode).send(`Error ${error.statusCode}`)
    }
    console.log(error)
    response.status(500).json({error: "Something broke..."})
})