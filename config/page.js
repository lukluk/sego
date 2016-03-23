var fs = require('fs')
module.exports=function(path){
  return fs.readFileSync(__dirname+'/page/'+path+'.html').toString()
}
