import http from 'http'
import express from 'express'
import createGame from './public/game.js'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const socket = new Server(server)

app.use(express.static('public'))

const game = createGame()
game.init()

const state = game.state

game.registerFunction((command) => {
  socket.emit(command.type, command)
})

socket.on('connection', (socket)=>{
  const playerId = socket.id
  console.log(`player connect on server with id: ${playerId}`)
  console.log(`timer = ${performance.now()}`)
  
  game.addPlayer({playerId:playerId})
  socket.emit('setup', state)
  console.log('state serverSide', state)

  socket.on('new-move', (command)=>{
    game.newMove(command)
  })
})

server.listen(3333, () => {
  console.log(`server in running on port: ${3333}`)
})

// const __dirname = dirname(fileURLToPath(import.meta.url))
// resolve(__dirname)
// function callback(request, response) {
//   const filename = request.url == "/" ? 'index.html' : __dirname + request.url
  
//   fs.readFile(filename, (err, data)=>{
//     if(err){
//       response.writeHead(404)
//       return response.end('Arquivo não entontrado')
//     }
//     if(request.url.indexOf('.css') !== -1){
//       response.setHeader('content-type', 'text/css')
//     }else if(request.url.indexOf('.js') !== -1){
//       response.setHeader('content-type', 'text/javascript')
//     }else
//       response.setHeader('content-type', 'text/html')
    
//     response.writeHead(200)
//     response.end(data)
//   })
// }