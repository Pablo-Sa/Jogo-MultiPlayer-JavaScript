import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import createGame from './js/Game.js'


const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('./'))

sockets.on('connection',(socket)=> {
    const playerId = socket.id
    console.log(`Player  connected on Server  with  id: ${playerId}`)

    socket.emit('setup',game.state)

})






const game = createGame()

game.addPlayer({ playerId: 'player1', playerX: 0, playerY: 0 })
game.addPlayer({ playerId: 'Vinícius', playerX: 2, playerY: 5 })
game.addPlayer({ playerId: 'João', playerX: 9, playerY: 7 })
game.addFruit({ fruitId: 'Fruta2', fruitX: 9, fruitY: 0 })
game.addFruit({ fruitId: 'Fruta1', fruitX: 7, fruitY: 0 })


console.log(game.state)





server.listen(3000, ()=> {
    console.log(`> Server listening on port 3000`)


}) 