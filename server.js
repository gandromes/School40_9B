const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const RewriteOptions = {
  file: path.resolve(__dirname, '.htaccess'),
  verbose: process.env.ENV_NODE === 'development',
  watch: process.env.ENV_NODE === 'development',
}

app.use(favicon(__dirname + '/assets/images/favicon.png'))

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname)))

app.get('*', function (req, res) {
  if (req.accepts('html')) {
    res.send('404', '<script>location.href = "/err404.html";</script>')
    return
  }
})

app.listen(port)