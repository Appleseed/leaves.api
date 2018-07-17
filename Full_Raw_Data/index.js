
var express = require('express')
var app = express()

var request = require("request");

var using = "";
request("http://www.example.com", function(error, response, body) {
  console.log(body); //Prints out raw/body in js
  using = body;
});

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send(using)
})

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081!')
})





/*const https = require('https');

https.get('http://www.example.com', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});*/

/*var request = require("request")

var url = "http://www.example.com/article.html"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
    }
})*/
