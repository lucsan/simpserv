# 🛠 SimpServ Simple Server

💼 A node based Micro web page server

🌐 Github page for simpserv https://lucsan.github.io/simpserv/
🌐 Github page for 🌞lucsan 🔬lab https://github.com/lucsan/lab/wiki

#### Usage:

- Simply move the `simpserv.js` file to a root folder and `node simpserv.js`
- For npm (node_modules) `npm run simpserv`
- For demo site pages, change `config root` to `node_modules/simpserv`

#### Operation:
- You can run it `node simpserv.js`
- Root is relative to the folder node is called from.
- It only reads html and included inline files (ie: it does not shell out for PHP, python etc)

#### Configuration:
🔖In `simpserv.js` you can change the configuration values
```javascript
const config = {
  port: '8080',
  root: '',
  index: 'index.html',
  autoload: true
}
```
