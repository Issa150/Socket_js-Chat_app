import express from "express"
import { Server } from "socket.io"
const port = 3000
const app = express()
const options = {
    cors:true,
    origin:('http://localhost:3000')
}
const server = app.listen(port,()=>{
    console.log(`Sever is runing on port: ${port}`)
})
const io = new Server(server, options)
// define to server that these files are to be sent to clints
// this make us to remove "./"behind the addressing file
app.use(express.static('./dist'))

app.get('/',(req,res)=>{
    res.sendFile("index.html")
})

io.on("connection", socket =>{
    socket.emit('welcome', socket.id)
    // To join a specefic room
    socket.join('Room_1') 
    // this is for finding the event ant sending it
    socket.on('message', message=> {
        
        io.to('Room_1').emit('receiveMessage', {
            userId: socket.id,
            message:message
        })
    })
})