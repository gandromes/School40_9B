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

//app.get('*', function (req, res) {
//  if (req.accepts('html')) {
//    res.send('404', '<script>location.href = "/err404.html";</script>')
//    return
//  }
//})

app.get('*', function(req, res){
    if (req.accepts('html')) {
        res.send('404', '<head><title>Ошибка 404</title>' +
            '<link rel="stylesheet" href="assets/css/style.css"></head>' +
            '<body class="err">\n' +
            '<figure class="errcontainer">\n' +
            '    <picture class="errimg">\n' +
            '        <source type="image/webp" srcset="assets/images/error/err404.webp" />\n' +
            '        <img src="assets/images/error/err404.png" alt="Ошибка 404!" />\n' +
            '    </picture>\n' +
            '    <figcaption class="err__text">\n' +
            '        Хей! Здесь ничего нет!<br />Мы вернемся куда надо через\n' +
            '        <span id="changeing">n</span> секунд...\n' +
            '    </figcaption>\n' +
            '</figure>\n' +
            '<script>\n' +
            '    changeFromTo(5, 0, changeing)\n' +
            '    function changeFromTo(from, to, changingItem) {\n' +
            '        if (from > to) {\n' +
            '            (changingItem.textContent = from--) &&\n' +
            '            setTimeout(() => changeFromTo(...arguments), 1000)\n' +
            '        } else\n' +
            '            document.head.innerHTML +=\n' +
            '                \'<meta http-equiv="refresh" content="0">\'\n' +
            '    }\n' +
            '</script>');
        return;
    }
});

app.listen(port)
