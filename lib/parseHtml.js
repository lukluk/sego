var S = require('string')
var md5 = require('md5')
var fs = require('fs')
var os = require('os')
module.exports = {
  executeServerTag: function(url, req, res) {
    var urls = url.split('?')
    url = urls[0]    
    if (!fs.existsSync(url)) {
      res.status(404)
      res.send(_sego.config.page('404'))
      return false
    }
    var html = fs.readFileSync(url, 'utf-8')
    var serverSide = ''
    if (html.indexOf('<script type="server">') >= 0) {
      serverSide = S(html).between('<script type="server">', '</script>').s
    }
    //if(!serverSide) serverSide = S(html).between('<?sego', '?>').s
    if (!serverSide) serverSide = serverSide ? serverSide : 'res.send(html)'
    var fnName = 'executeServerTag'
    var overideResponse = ''
    if (serverSide.indexOf('res.send') < 0 &&
      serverSide.indexOf('res.json') < 0 &&
      serverSide.indexOf('sego.render') < 0
    ) {
      overideResponse = "res.send('you not response any thing," +
        "you must put sego.render([something])')"
    }
    var serverTag = serverSide
    var inject = fs.readFileSync(__dirname + '/injectThisCode.js').toString()
    inject = S(inject).replaceAll('fnName', fnName)
    serverSide = S(inject).replaceAll('//INJECTHERE', serverSide + overideResponse)

    if (!fs.existsSync(os.tmpdir())) fs.mkdirSync(os.tmpdir())
    var jsFile = os.tmpdir() + md5(url) + (new Date()).getTime() + '.js'
    fs.writeFileSync(jsFile, serverSide, 'utf-8')
    var template = html.replace(serverTag, "console.log('welcome to sego.js')")
    if (fs.existsSync(jsFile)) {
      var fn = require(jsFile)
      fn(template, req, res)
    }
  }
}
