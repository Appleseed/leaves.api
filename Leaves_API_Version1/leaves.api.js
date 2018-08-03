class LeavesStaticClass {
    static leavesContent (url, title, res_type, res) {
	var request = require("request");
	request(url, function(error, response, body) {
		console.log(title);
		var bodytest = '';
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
				var embedhtmlcode = '<blockquote class="embedly-card"><h4><a href="' + url +'">' + thistitle + '</a></h4><p>'+ thisbody+'</p></blockquote><script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>';
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

module.exports = LeavesStaticClass;