import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import createGame from './js/Game.js'


const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('./'))

const game = createGame();
game.startGame();

game.subscribe((command) => {
    console.log(`> Emiting ${command.type}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {

    const playerId = socket.id
    console.log(`Player  connected on Server  with  id: ${playerId}`)

    game.addPlayer({ playerId: playerId })
    console.log(game.state)

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({ playerId })
        console.log(`Jogardor foi Desconectado Id: ${playerId}`)
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'
 
        game.movePlayer(command);
    });

})

server.listen(3000, () => {
    console.log(`> Server listening on port 3000`)
}) 