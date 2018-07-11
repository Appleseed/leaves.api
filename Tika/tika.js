var tika = require('tika');

var options = {

	// Hint the content-type. This is optional but would help Tika choose a parser in some cases.
	contentType: 'application/pdf'
};

tika.text('test/data/file.pdf', options, function(err, text) {
	console.log(text);
});

tika.xhtml('test/data/file.pdf', function(err, xhtml) {
	console.log(xhtml);
});
