from flask import Flask
from flask import jsonify
from newspaper import Article
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def homepage():
    return "Hello World!"

@app.route('/scrap')
def scrapURL():
    obj = {}
    url = request.args['url']
    article = Article(url)
    article.download()
    article.parse()
    obj['authors'] = article.authors
    obj['publish_date'] = article.publish_date
    obj['top_image'] = article.top_image
    obj['movies'] = article.movies
    obj['text'] = article.text
    obj['title'] = article.title
    obj['source_url'] = article.source_url 
    article.nlp()
    obj['keywords'] = article.keywords
    obj['summary'] = article.summary
    return jsonify(obj)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
