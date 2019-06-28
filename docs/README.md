SimpServ simple Server is a, small footprint, node js, web Server, in a single page of javascript, which is exciting.

The code is available at: https://github.com/lucsan/simpserv/blob/master/simpserv.js

You can just copy the file to a 🍰 desired location, or if you like, do the whole npm git thing and 👽 clone or 🍴 fork, or 🥄 spoon from the remote repo https://github.com/lucsan/simpserv .

It's purpose is to provide a 💨quick and 💩dirty local dev server for js, html and css.

For this 📃recipe we will require some node packages from the basic nodejs library.

```javascript
const http = require('http')
const url = require('url')
const fs = require('fs')
```

Thus you will need ___nodejs___ installed on your machine. I will let you have the fun of working out 😱 how to do that.

There is simple configuration in the file,

```javascript
const config = {
  port: '8080', // And any port you like.
  root: '', // If you want to server files from a different location to where you started node.
  autoload: true, // Auto loads a window in the default browser.
  index: 'index.html', // You need an index.html in your root.
}
```

The 🚂'engine' is started when ___start()___ is called via the command line using node or npm.

##### 📄For example:
`node simpserv.js`, or (if you have the package.json) `npm run serv`

The start function is quite simple. A server (`http.createServer().listen()`) is created and told to listen intently to the browser.

The `onRequest()` function is gently injected into `createServer` making the `request.on` event handler available, which waits eagerly to receive input (ie: a uri) from its loving browser.

```javascript
function start () {
  http.createServer(onRequest).listen(config.port)
  console.log('SimpServ running')
  function onRequest(request, response) {
    request.on('error', function(err){ console.log('err ', err) })
    router(request, response)
  }
}
```

Every time the ___request.on___ event receives a new uri it eagerly passes it to the router function.

The router function is so super-duper it handles everything else. In a larger project this might be included as a module, anyway, here it is ...

```javascript
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
    if (err) console.log(err)
    response.writeHead(200, { 'Content-Type': `${ct}charset=utf-8` })
    if (page) {
      response.write(page)
    } else {
      response.write('Error')
    }
    response.end()
  })
}
```

In the first few lines we extract essence of path from _root uri_,

ie: root = / or '', anything after the ___/___ is considered to be path.

eg: <br>https://localhost/myproject/ = / or ''
<br>https://localhost/myproject/index.html = index.html
<br>https://localhost/myproject/some/place = some/place

We use index.html as the default file if the path is empty, but you could make this any file you like.

Next we inspect the path for extension types. In this case we only care about css and js, which is not so very caring of us at all, but, other extensions can be catered for (eg: php).
The desired MIME type is inserted into ___ct___

Finally __readfile__ is called, passing in the path, and it serves the referenced file (which should be in, _or relative_, to the root or _node running_ folder), if it can find it, else, errors out. 🤖 does not compute.

This bit of code:  
```javascript
if (process.platform == 'win32') {
  require('child_process')
    .exec(`start http://localhost:${config.port}`)
}
```
Opens a page in the default browser pointing at __/__ or __/index.htm__, it only works on Windows, but you can find the equivalent for other OS's. This is a nice touch, though technically not part of the simple server as such.

As you can see you could easy-peasy begin to modify this code for nefarious purposes (php, data endpoint), or to make it more comprehensive (and complex), or adapt it to a specific purpose (much as 🖌illustrated by the existing code).

Here is a code snippet to respond to an API endpoint:

```javascript
if (path.indexOf('/customer') > -1) {
  if (path.indexOf('/name') > -1) filepath = '/customerName.html'
  if (path.indexOf('/address') > -1) filepath = '/customerAddress.html'
}
```
and is inserted here:
```
if (ext == 'js') ct = 'text/javascript;'
  // --- Insert filepath adapters here --- //
fs.readFile(path,  (err, page) => { ...
```
Now when you visit __/customer/name__ the file customerName.html is returned, but this could just as easily be some json data, or __filepath__ could resolve to html returned from a function.
```javascript
  filepath = myDataHtml('getSome')
```
🏄‍Surfs up Dudes🌊
