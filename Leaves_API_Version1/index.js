var express = require('express')
var app = express()

app.set('port', process.env.PORT || 8081);
// app.set('host', process.env.HOST || '192.168.99.100');

var using = "";

var fullUrl = '';
app.get('/', function(req, res){ //returns URL
  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.send('ANANT CORPORATION LEAVES API- url: ' + fullUrl + ", ALL METADATA IN CONSOLE.LOG WHEN Index.js is run."); //prints url parameter
});


var leavesApi = require("./leaves.api");
app.get('/content/full/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  leavesApi.leavesContent(urlpath, "FULL HTML", 'JSON', res);
});

app.get('/content/raw/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  leavesApi.leavesContent(urlpath, "RAW HTML", 'HTML', res);
});

app.get('/content/text/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  leavesApi.leavesTextCard(urlpath, "TEXT", "TEXT", res);
});

app.get('/meta/card/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  leavesApi.leavesTextCard(urlpath, "EMBED CARD HTML", "CARD", res);
});

app.get('/images/test/:url', (req, res) => {
  var urlpath = 'http://'+req.params.url;
  leavesApi.leavesImages(urlpath, "Default image", '/app/images/imageout_def.png', "", res);
});

app.get('/images/first/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  var options = {
	  screenSize: {
		width: 320
	  , height: 480
	  }
	, shotSize: {
		width: 320
	  , height: 'all'
	  }
	  }
  leavesApi.leavesImages(urlpath, "First image", '/app/images/imageout.png', options, res);
});

app.get('/images/thumb/large/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  var options = {
  screenSize: {
    width: 2048
  , height: 898
  }
, shotSize: {
    width: 'all'
  , height: 'all'
  }
  }
  leavesApi.leavesImages(urlpath, "THUMB BIG", '/app/images/imageout-BIG.png', options, res);
});

app.get('/images/thumb/medium/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  var options = {
  screenSize: {
    width: 1024
  , height: 449
  }
, shotSize: {
    width: 'all'
  , height: 'all'
  }
  }
  leavesApi.leavesImages(urlpath, "THUMB MEDIUM", '/app/images/imageout-MEDIUM.png', options, res);
});

app.get('/images/thumb/small/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  var options = {
  screenSize: {
    width: 512
  , height: 224
  }
, shotSize: {
    width: 'all'
  , height: 'all'
  }
  }
  leavesApi.leavesImages(urlpath, "THUMB SMALL", '/app/images/imageout-SMALL.png', options, res);
});

app.get('/meta/pagerank/:url', (req, res) => {
  var urlpath = 'http://'+req.params.url;
  leavesApi.leavesPageRank(urlpath, "PAGE RANK", res);
});

app.get('/content/read/:url', (req, res) => {
  var urlpath = 'http://'+req.params.url;
  leavesApi.leavesRead(urlpath, "READABLE HTML", res);
});

//Note: Embed.ly account costs money

app.listen(app.get('port'), '0.0.0.0', function () {
  //console.log('app listening on port 8081!')
})
