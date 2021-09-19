import http from 'http'
import fs, { fdatasync } from 'fs'
import {dirname, resolve}from 'path'
import {fileURLToPath} from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
resolve(__dirname)

const server = http.createServer(callback)

function callback(request, response) {
  const filename = request.url == "/" ? 'index.html' : __dirname + request.url
  
  fs.readFile(filename, (err, data)=>{
    if(err){
      response.writeHead(404)
      return response.end('Arquivo não entontrado')
    }    
    if(request.url.indexOf('.css') !== -1){
      response.setHeader('content-type', 'text/css')
    }else if(request.url.indexOf('.js') !== -1){
      response.setHeader('content-type', 'text/javascript')
    }else
      response.setHeader('content-type', 'text/html')
    
    response.writeHead(200)
    response.end(data)
  })
}

server.listen(3333, () => {
  console.log(`server in running on port: ${3333}`)
})