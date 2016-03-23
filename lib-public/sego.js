var handlebars = require('handlebars')
var mysql = require('mysql')
var db = require('node-localdb')


function Sego(template,dom, req, res) {
  this.mysql=false
  this.model = function(name){
    return db(name+'.js')
  }
  this.session = req.session
  this.mysql_connection = function(conn) {
    this.mysql = mysql.createConnection(conn)
    this.mysql.connect()
  }
  this.mysql_disconnect = function(){
    this.mysql.end()
  }
  this.html = template
  this.render = function(data) {
    if (data == '404') {
      res.send(_sego.config.page('404'))
      return false
    }
    var handleTemplate = handlebars.compile(dom.html())
    res.send(handleTemplate(data))
  }
  this.params = req.query
  this.headers = function() {
    return req.headers
  }
}

module.exports = Sego
