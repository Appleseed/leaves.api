var express = require('express')
var app = express()

app.set('port', process.env.PORT || 8081);
// app.set('host', process.env.HOST || '192.168.99.100');


// Exposes a higher level API which takes a URL and a callback URL as an input. It spawns the component processes to gather data and then once complete it POSTs the data to the call back URL.
// Endpoints:
// /content/all/?url=http://www.example.com/article.html&callback=https://another.endpoint/url

var request = require("request");

var using = "";

var fullUrl = '';
app.get('/', function(req, res){ //returns URL
  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.send('ANANT CORPORATION LEAVES API VERSION 2- url: ' + fullUrl + ", ALL METADATA IN CONSOLE.LOG WHEN Index.js is run."); //prints url parameter
});

//Currently testing posting the data to a callback URL
var urlpath = '';
var callbackurl = '';
var callbackpath = '';
//Callback Example- Leaves API Version 2
app.get('/content/all/:url/:callbackurl', (req, res) => { //first
  urlpath = 'http://'+req.params.url;
  var oldcallback = req.params.callbackurl;
  var newcallback = '';
  for (i = 0; i < oldcallback.length; i++) {
    if(oldcallback[i]=='.'){
    newcallback += '/';
    }
    else{
      newcallback +=oldcallback[i];
    }
  }
  callbackurl = 'http://'+newcallback;
  callbackpath = callbackurl.substring(21,callbackurl.length) + "/";
  request(urlpath, function(error, response, body) {
    bodytest = body;
	  res.status(200).send({
		url: urlpath,
    cburl: callbackurl,
    cbpath: callbackpath,
    content: "Data gathered by Component Processes",
	  })
	});
});
//
//Posts to a callbackurl
var pathinapp = '/content/callback/';
app.get(pathinapp, (req, res) => {
  console.log(callbackpath);
 res.status(201).send({
   url: urlpath,
   cburl: callbackurl,
   cbpath: callbackpath,
 })
});

// app.get('/content/callback/', (req, res) => {
//  res.status(201).send({
//    url: urlpath,
//    cburl: callbackurl,
//    cbpath: callbackpath,
//  })
// });

// app.get(callbackpath, (req, res) => {
//  res.status(201).send({
//    url: urlpath,
//    cburl: callbackurl,
//    cbpath: callbackpath,
//  })
//  console.log(url + " : " + urlpath);
//  console.log(callbackurlpath + " : " + callbackurl);
//  console.log(callbackpath + ":" + call)
// });

// app.get('/content/full/:url', (req, res) => { //first
//   var urlpath = 'http://'+req.params.url;
//   request(urlpath, function(error, response, body) {
//     console.log("FULL HTML")
//     bodytest = body;
//     console.log(body); //Prints out raw/body of the url in js
//     console.log('*****************************************************************')
// 	  res.status(200).send({
// 		body: bodytest,
// 	  })
// 	});
// });

// app.get('/content/raw/:url', (req, res) => { //first
//   var urlpath = 'http://'+req.params.url;
//   request(urlpath, function(error, response, body) {
//     console.log("RAW HTML")
//     bodytest = body;
//     console.log(body); //Prints out raw/body of the url in js
//     console.log('*****************************************************************')
// 	  res.status(200).send(
// 		bodytest)
// 	});
// });
//
// var read = require('node-readability');
//
// app.get('/content/read/:url', (req, res) => { //first
//   var urlpath = 'http://'+req.params.url;
//   read(urlpath, function(error, article, meta) {
//     console.log("READABLE HTML")
// 	text = article.title;
//     text += article.content;
// 	text += article.body;
//     console.log(text); //Prints out raw/body of the url in js
//     console.log('*****************************************************************')
// 	article.close();
// 	res.status(200).send({
// 		text})
// 	});
// });
//
// app.get('/content/text/:url', (req, res) => { //first
//   var urlpath = 'http://'+req.params.url;
//   var extractor = new BodyExtractor({
//     url: urlpath
//   });
//   extractor.analyze().then(function(text) {
//     textcontent = extractor.title;
//     textcontent += extractor.mainText;
// 	console.log(extractor.title);
// 	console.log(extractor.mainText);
// 	res.status(200).send({
// 		textcontent})
// 	});
// });
//
// var thistitle = ''; //Stores title for later
// var thisbody = ''; //Stores body for later
//
// var BodyExtractor = require('extract-main-text');
//
// app.get('/meta/card/:url', (req, res) => { //first
//   var urlpath = 'http://'+req.params.url;
//   var extractor = new BodyExtractor({
//     url: urlpath
//   });
//   extractor.analyze().then(function(text) {
//     thistitle = extractor.title;
//     thisbody = extractor.mainText;
//     var embedhtmlcode = '<blockquote class="embedly-card"><h4><a href="' + fullUrl +'">' + thistitle + '</a></h4><p>'+ thisbody+'</p></blockquote><script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>';
// 	console.log("EMBED CARD HTML");
// 	console.log(embedhtmlcode)
// 	res.status(200).send({
// 		embedhtmlcode})
// 	});
// });
//
// var wkhtmltoimage = require('wkhtmltoimage');
// const fs = require('fs');
// const resizeImg = require('resize-img');
//
// app.get('/images/first/:url', (req, res) => { //first
//   var urlpath = 'http://'+req.params.url;
//   wkhtmltoimage.generate(urlpath, { output: 'images/imageout.png' });
//   console.log("Image generated in folder: imageout.png")
//   res.sendFile('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout.png');
//   res.sendFile('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout-BIG.png');
//
// });
//
// app.get('/images/thumb/large/:url', (req, res) => { //first
//    var urlpath = 'http://'+req.params.url;
//    wkhtmltoimage.generate(urlpath, { output: '/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout.png' });
//   resizeImg(fs.readFileSync('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout.png'), {width: 2048, height: 898}).then(buf => {
//     fs.writeFileSync('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout-BIG.png', buf);
//      console.log("THUMB BIG");
//     console.log("Image generated in folder: imageout-BIG.png")
// 	res.sendFile('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout-BIG.png')});
// });
//
// app.get('/images/thumb/medium/:url', (req, res) => { //first
//   var urlpath = 'http://'+req.params.url;
//   wkhtmltoimage.generate(urlpath, { output: '/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout.png' });
//   resizeImg(fs.readFileSync('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout.png'), {width: 1024, height: 449}).then(buf => {
//     fs.writeFileSync('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout-MEDIUM.png', buf);
//     console.log("THUMB MEDIUM");
//     console.log("Image generated in folder: imageout-MEDIUM.png")
// 	res.sendFile('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout-MEDIUM.png')});
// });
//
// app.get('/images/thumb/small/:url', (req, res) => { //first
//   var urlpath = 'http://'+req.params.url;
//   wkhtmltoimage.generate(urlpath, { output: '/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout.png' });
//   resizeImg(fs.readFileSync('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout.png'), {width: 512, height: 224}).then(buf => {
//     fs.writeFileSync('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout-SMALL.png', buf);
//     console.log("THUMB SMALL");
//     console.log("Image generated in folder: imageout-SMALL.png")
// 	res.sendFile('/Users/ankitgupta/Desktop/leaves.api-Dev/Leaves_API_Version1/images/imageout-SMALL.png')});
// });
//
// var pagerank = require('google-pagerank');
// var rankerpage = 0;
//
// app.get('/meta/pagerank/:url', (req, res) => { //first
//   var urlpath = 'http://'+req.params.url;
//   pagerank(urlpath, function(err, rank) {
//   console.log("PAGE RANK");
//   console.log('Got pagerank', rank);
//   rankerpage = rank;
//   res.status(200).send({
//     rank: rankerpage,
//   });
//   });
//
// });

//Note: Embed.ly account costs money

app.listen(app.get('port'), '0.0.0.0', function () {
  console.log('app listening on port 8081!')
})
