function fnName(html,req,res){
  console.log(__dirname)
  var Sego = require('/usr/local/lib/node_modules/sego/lib-public/sego.js')
  var cheerio = require('/usr/local/lib/node_modules/sego/node_modules/cheerio/index.js')
  var localStorage = require('/usr/local/lib/node_modules/sego/node_modules/localStorage/lib/localStorage.js')
  var $ = cheerio.load(html)
  var sego = new Sego(html,$,req,res)

  //INJECTHERE
}
module.exports=fnName
