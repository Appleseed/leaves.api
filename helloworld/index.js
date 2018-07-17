
//Load express module with `require` directive
var express = require('express')
var app = express()

//Define request response in root URL (/)
var url = "http://www.example.com/article.html";
function functUrl(newurl) {
    return newurl;              // The function returns the product of p1 and p2
}

app.get('/', function(req, res){
  res.send('url: ' + functUrl(url)); //prints url parameter
});

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081!')
})
