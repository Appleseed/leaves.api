var express = require('express')
var bodyParser = require("body-parser");
var app = express()

var request = require("request");

var using = "";

var fullUrl = '';
app.get('/', function(req, res){ //returns URL
  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.send('ANANT CORPORATION LEAVES API- url: ' + fullUrl + ", ALL METADATA IN CONSOLE.LOG WHEN Index.js is run."); //prints url parameter
});

var routes = require("./routes.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

//Comment the following ONCE fullUrl is not an empty page
fullUrl = 'http://www.example.com/article.html';
//End Commenting
console.log("LEAVES API- Version 1")
console.log('*****************************************************************')
console.log("URL");
console.log(fullUrl);
console.log('*****************************************************************')


request(fullUrl, function(error, response, body) {
  console.log("RAW/FULL HTML")
  console.log(body); //Prints out raw/body of the url in js
  console.log('*****************************************************************')
});

var thistitle = ''; //Stores title for later
var thisbody = ''; //Stores body for later

var BodyExtractor = require('extract-main-text');
var extractor = new BodyExtractor({
    url: fullUrl
  });
extractor.analyze().then(function(text) {
    console.log("TEXT SERVICE")
    thistitle = extractor.title;
    thisbody = extractor.mainText;
    console.log(extractor.title);
    console.log(extractor.mainText);
    console.log('*****************************************************************')

    console.log("EMBED CARD HTML");
    var embedhtmlcode = '<blockquote class="embedly-card"><h4><a href="' + fullUrl +'">' + thistitle + '</a></h4><p>'+ thisbody+'</p></blockquote><script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>';
    console.log(embedhtmlcode);
    console.log('*****************************************************************')
});

console.log("IMAGE");

var wkhtmltoimage = require('wkhtmltoimage');
wkhtmltoimage.generate(fullUrl, { output: './images/imageout.png' });
console.log("Image generated in folder: imageout.png")
console.log('*****************************************************************')

const fs = require('fs');
const resizeImg = require('resize-img');

resizeImg(fs.readFileSync('./images/imageout.png'), {width: 2048, height: 898}).then(buf => {
    fs.writeFileSync('./images/imageout-BIG.png', buf);
    console.log("THUMB BIG");
    console.log("Image generated in folder: imageout-BIG.png")
    console.log('*****************************************************************')

});

resizeImg(fs.readFileSync('./images/imageout.png'), {width: 1024, height: 449}).then(buf => {
    fs.writeFileSync('./images/imageout-MEDIUM.png', buf);
    console.log("THUMB MEDIUM");
    console.log("Image generated in folder: imageout-MEDIUM.png")
    console.log('*****************************************************************')

});

resizeImg(fs.readFileSync('./images/imageout.png'), {width: 512, height: 224}).then(buf => {
    fs.writeFileSync('./images/imageout-SMALL.png', buf);
    console.log("THUMB SMALL");
    console.log("Image generated in folder: imageout-SMALL.png")
    console.log('*****************************************************************')

});

var pagerank = require('google-pagerank');

var rankerpage = 0;
pagerank(fullUrl, function(err, rank) {
  console.log("PAGE RANK");
  console.log('Got pagerank', rank);
  rankerpage = rank;
  console.log('*****************************************************************')

});

var read = require('node-readability');

read(fullUrl, function(err, article, meta) {
  // Main Article
  console.log("READABLE HTML");

  console.log(article.content);
  // Title
  console.log(article.title);

  // HTML Source Code
  console.log(article.html);
  console.log('*****************************************************************')

  // DOM
  //console.log(article.document);

  // Response Object from Request Lib
  //console.log(meta);

  // Close article to clean up jsdom and prevent leaks
  article.close();
});

//Note: Embed.ly account costs money

var server = app.listen(8081, function () {
  console.log('app listening on port 8081!')
})
