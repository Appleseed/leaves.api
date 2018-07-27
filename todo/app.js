import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';

var fullUrl = '';

// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
fullUrl = 'http://www.example.com/article.html';

const fs = require('fs');
//wkhtmltoimage.generate(fullUrl, { output: 'imageout.png' });
wkhtmltoimage.generate('http://example.com/', { pageSize: 'letter' }).pipe(fs.createWriteStream('out.jpg'));
//console.log("Image generated in folder: imageout.png")
console.log("Image generated in folder: out.jpg")
console.log('*****************************************************************')

//const fs = require('fs');
const resizeImg = require('resize-img');

resizeImg(fs.readFileSync('out.jpg'), {width: 2048, height: 898}).then(buf => {
    fs.writeFileSync('imageout-BIG.png', buf);
    console.log("THUMB BIG");
    console.log("Image generated in folder: imageout-BIG.png")
    console.log('*****************************************************************')

});

// get all todos
app.get('/api/v1/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db
  })
});

app.post('/api/v1/todos', (req, res) => {
  if(!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if(!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
 const todo = {
   id: db.length + 1,
   title: req.body.title,
   description: req.body.description
 }
 db.push(todo);
 return res.status(201).send({
   success: 'true',
   message: 'todo added successfully',
   todo
 })
});

app.get('/api/v1/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((todo) => {
    if(todo.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        todo: todo
      });
    }
  });
  return res.status(404).send({
    success: 'false',
    message: `todo with the title ${title} does not exist`
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});