var express = require('express')
var app = express()

app.set('port', process.env.PORT || 8081);
// app.set('host', process.env.HOST || '192.168.99.100');

var request = require("request");

var using = "";

var fullUrl = '';
app.get('/', function(req, res){ //returns URL
  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.send('ANANT CORPORATION LEAVES API- url: ' + fullUrl + ", ALL METADATA IN CONSOLE.LOG WHEN Index.js is run."); //prints url parameter
});


var bodytest = '';
app.get('/content/full/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  request(urlpath, function(error, response, body) {
    console.log("FULL HTML")
    bodytest = body;
    console.log(body); //Prints out raw/body of the url in js
    console.log('*****************************************************************')
	  res.status(200).send({
		body: bodytest,
	  })
	});
});

app.get('/content/raw/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  request(urlpath, function(error, response, body) {
    console.log("RAW HTML")
    bodytest = body;
    console.log(body); //Prints out raw/body of the url in js
    console.log('*****************************************************************')
	  res.status(200).send(
		bodytest)
	});
});

var read = require('node-readability');

app.get('/content/read/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  read(urlpath, function(error, article, meta) {
    console.log("READABLE HTML")
	text = article.title;
    text += article.content;
	text += article.body;
    console.log(text); //Prints out raw/body of the url in js
    console.log('*****************************************************************')
	article.close();
	res.status(200).send({
		text})
	});
});

app.get('/content/text/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  var extractor = new BodyExtractor({
    url: urlpath
  });
  extractor.analyze().then(function(text) {
    textcontent = extractor.title;
    textcontent += extractor.mainText;
	console.log(extractor.title);
	console.log(extractor.mainText);
	res.status(200).send({
		textcontent})
	});
});

var thistitle = ''; //Stores title for later
var thisbody = ''; //Stores body for later

var BodyExtractor = require('extract-main-text');

app.get('/meta/card/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  var extractor = new BodyExtractor({
    url: urlpath
  });
  extractor.analyze().then(function(text) {
    thistitle = extractor.title;
    thisbody = extractor.mainText;
    var embedhtmlcode = '<blockquote class="embedly-card"><h4><a href="' + fullUrl +'">' + thistitle + '</a></h4><p>'+ thisbody+'</p></blockquote><script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>';
	console.log("EMBED CARD HTML");
	console.log(embedhtmlcode)
	res.status(200).send({
		embedhtmlcode})
	});
});

var webshot = require('webshot');
app.get('/images/test/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  webshot(urlpath, '/app/imageout.png', function(err){
	  res.sendFile('/app/imageout.png');
  });
});


var wkhtmltoimage = require('wkhtmltoimage');
const fs = require('fs');
const resizeImg = require('resize-img');

app.get('/images/first/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
//  var options = {defaultWhiteBackground: true}
//  wkhtmltoimage.generate(urlpath, { output: '/app/images/imageout.png' });
  webshot(urlpath, '/app/images/imageout.png', function(err){
  console.log("Image generated in folder: imageout.png")
  res.sendFile('/app/images/imageout.png')});
});

app.get('/images/thumb/large/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  wkhtmltoimage.generate(urlpath, { output: '/app/images/imageout.png' });
  resizeImg(fs.readFileSync('/app/images/imageout.png'), {width: 2048, height: 898}).then(buf => {
    fs.writeFileSync('/app/images/imageout-BIG.png', buf);
    console.log("THUMB BIG");
    console.log("Image generated in folder: imageout-BIG.png")
	res.sendFile('/app/images/imageout-BIG.png')});
});

app.get('/images/thumb/medium/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  wkhtmltoimage.generate(urlpath, { output: '/app/images/imageout.png' });
  resizeImg(fs.readFileSync('/app/images/imageout.png'), {width: 1024, height: 449}).then(buf => {
    fs.writeFileSync('/app/images/imageout-MEDIUM.png', buf);
    console.log("THUMB MEDIUM");
    console.log("Image generated in folder: imageout-MEDIUM.png")
	res.sendFile('/app/images/imageout-MEDIUM.png')});
});

app.get('/images/thumb/small/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  wkhtmltoimage.generate(urlpath, { output: '/app/images/imageout.png' });
  resizeImg(fs.readFileSync('/app/images/imageout.png'), {width: 512, height: 224}).then(buf => {
    fs.writeFileSync('/app/images/imageout-SMALL.png', buf);
    console.log("THUMB SMALL");
    console.log("Image generated in folder: imageout-SMALL.png")
	res.sendFile('/app/images/imageout-SMALL.png')});
});

var pagerank = require('google-pagerank');
var rankerpage = 0;

app.get('/meta/pagerank/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  pagerank(urlpath, function(err, rank) {
  console.log("PAGE RANK");
  console.log('Got pagerank', rank);
  rankerpage = rank;
  res.status(200).send({
    rank: rankerpage,
  });
  });
  
});

//Note: Embed.ly account costs money

app.listen(app.get('port'), '0.0.0.0', function () {
  //console.log('app listening on port 8081!')
})
