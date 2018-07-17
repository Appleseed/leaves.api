var pagerank = require('google-pagerank');
var express = require('express');

var app = express()
var thisurl = 'http://example.com'

var rankerpage = 0;
pagerank(thisurl, function(err, rank) {
  console.log('Got pagerank', rank);
  rankerpage = rank;
});

app.get('/', function (req, res) {
  res.send("URL: " + thisurl + ", Google Page Rank: " + rankerpage)
})

app.listen(8081, function () {
  console.log('app listening on port 8081!')
})
