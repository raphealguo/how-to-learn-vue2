var fs = require("fs")  
var path = require("path")  
var args = process.argv.slice(2);
var readDir = args[0]
   
function readDirSync(path) {
  var line = 0
  fs.readdirSync(path).forEach(function(ele, index){
    var filePath = path + "/" + ele
    var info = fs.statSync(filePath)    
    if (info.isDirectory()) {
      line += readDirSync(filePath) 
    } else {  
      // console.log("file: " + filePath)  
      line += getLineByFilepath(filePath)
    }
  })

  return line
}

function getLineByFilepath(filePath) {
  var data = fs.readFileSync(filePath, "utf-8");  
  var match = data.match(/\n/g)
  var line = match && match.length
  return line ? line + 1 : 0
}

if (!!readDir) {
  var line = readDirSync(readDir)
  console.log("total line: " + line)
} else {
  console.log("node line.js <path>")
}