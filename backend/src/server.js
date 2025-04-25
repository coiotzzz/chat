const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080, host: '0.0.0.0' });

wss.on("connection", (ws) => {
    ws.on("error", console.error)

    

    ws.on("message", (data) => {
        console.log("mensagem recebida do cliente:", data.toString())
        wss.clients.forEach((client) => client.send(data.toString()))
    })

    console.log("client connected")
})