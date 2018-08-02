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

class LeavesStaticClass {
    static leavesContent (url, title, res_type, res) {
	  request(url, function(error, response, body) {
		console.log(title)
		bodytest = body;
		console.log(body); //Prints out raw/body of the url in js
		console.log('*****************************************************************')
		if (res_type === 'JSON'){
		  res.status(200).send({
			body: bodytest,
			})
		} else {
		  res.status(200).send( bodytest )
		}
		});
    }
    static leavesTextCard (url, heading, req_type, res) {
		var thistitle = ''; //Stores title for later
		var thisbody = ''; //Stores body for later
		var BodyExtractor = require('extract-main-text');
		var extractor = new BodyExtractor({
			url: url
		  });
		  var textcontent = ''
		  extractor.analyze().then(function(text) {
			textcontent = extractor.title;
			textcontent += extractor.mainText;
			if (req_type === 'TEXT') {
				console.log(extractor.title);
				console.log(extractor.mainText);
				res.status(200).send({
					textcontent})
			} else {
				var embedhtmlcode = '<blockquote class="embedly-card"><h4><a href="' + fullUrl +'">' + thistitle + '</a></h4><p>'+ thisbody+'</p></blockquote><script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>';
				console.log(heading);
				console.log(embedhtmlcode)
				res.status(200).send({embedhtmlcode});
			}
		  })
	}
    static leavesImages (url, heading, image_path, options, res) {
		var webshot = require('webshot');
		console.log(heading);
		if (options === ""){
	    webshot(url, image_path, function(err){
			  res.sendFile(image_path);
		})}
		else{webshot(url, image_path, options, function(err){
			  res.sendFile(image_path);
		})};
	}
    static leavesPageRank (url, heading, res) {
		var pagerank = require('google-pagerank');
		var rankerpage = 0;
		pagerank(url, function(err, rank) {
			console.log(heading);
			console.log('Got pagerank', rank);
			rankerpage = rank;
			res.status(200).send({
			rank: rankerpage,});
		});
	}
    static leavesRead (url, heading, res) {
		var read = require('node-readability');
		read(url, function(error, article, meta) {
			console.log(heading);
			var text = article.title;
			text += article.content;
			text += article.body;
			console.log(text); //Prints out raw/body of the url in js
			console.log('*****************************************************************')
			article.close();
			res.status(200).send({text})
		});
	}
}

app.get('/content/full/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  LeavesStaticClass.leavesContent(urlpath, "FULL HTML", 'JSON', res);
});

app.get('/content/raw/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  LeavesStaticClass.leavesContent(urlpath, "RAW HTML", 'HTML', res);
});

app.get('/content/text/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  LeavesStaticClass.leavesTextCard(urlpath, "TEXT", "TEXT", res);
});

app.get('/meta/card/:url', (req, res) => { //first
  var urlpath = 'http://'+req.params.url;
  LeavesStaticClass.leavesTextCard(urlpath, "EMBED CARD HTML", "CARD", res);
});

app.get('/images/test/:url', (req, res) => {
  var urlpath = 'http://'+req.params.url;
  LeavesStaticClass.leavesImages(urlpath, "Default image", '/app/images/imageout_def.png', "", res);
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
  LeavesStaticClass.leavesImages(urlpath, "First image", '/app/images/imageout.png', options, res);
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
  LeavesStaticClass.leavesImages(urlpath, "THUMB BIG", '/app/images/imageout-BIG.png', options, res);
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
  LeavesStaticClass.leavesImages(urlpath, "THUMB MEDIUM", '/app/images/imageout-MEDIUM.png', options, res);
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
  LeavesStaticClass.leavesImages(urlpath, "THUMB SMALL", '/app/images/imageout-SMALL.png', options, res);
});

app.get('/meta/pagerank/:url', (req, res) => {
  var urlpath = 'http://'+req.params.url;
  LeavesStaticClass.leavesPageRank(urlpath, "PAGE RANK", res);
});

app.get('/content/read/:url', (req, res) => {
  var urlpath = 'http://'+req.params.url;
  LeavesStaticClass.leavesRead(urlpath, "READABLE HTML", res);
});

//Note: Embed.ly account costs money

app.listen(app.get('port'), '0.0.0.0', function () {
  //console.log('app listening on port 8081!')
})
