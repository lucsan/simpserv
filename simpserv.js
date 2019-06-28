const http = require('http')
const url = require('url')
const fs = require('fs')

const config = {
  port: '8080',
  root: '',
  index: 'index.html',
  autoload: true
}

// The server is relative to the folder node is called in.
const router = (request, response) => {
  let filename = url.parse(request.url).pathname
  filename = filename.replace('/', '')
  if (filename == '') filename = config.index
  let path = (config.root == '' ? filename : `${config.root}/${filename}`)
  let bits = path.split('.')
  let ext = bits[bits.length - 1]
  let ct = 'text/html;'
  if (ext == 'css') ct = 'text/css;'
  if (ext == 'js') ct = 'text/javascript;'

  fs.readFile(path,  (err, page) => {
    if (err) console.error(err)
    response.writeHead(200, { 'Content-Type': `${ct}charset=utf-8` })
    if (page) {
      response.write(page)
    } else {
      response.write('Error')
    }
    response.end()
  })
}

function start () {
  http.createServer(onRequest).listen(config.port)
  console.info('SimpServ running')
  function onRequest(request, response) {
    request.on('error', function(err){ console.error('err ', err) })
    router(request, response)
  }
}

exports.start = start

start()

// 📝 THe Following code is configured for win10 default browser.
if (config.autoLoad && process.platform == 'win32') {
  require('child_process').exec(`start http://localhost:${config.port}`)
}

console.info(`Server running @ http://localhost:${config.port}, Auto browser loading: ${config.autoLoad}`)
