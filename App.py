# Written by Jagannath Bilgi <jsbilgi@yahoo.com>
"""
Creates web service on localhost port 5500 for loading wallabag
Expects title, url and tags
tags expects comma seperated values

title and tags are optional

example

http://192.168.99.100:5500/params?url=https://developer.ibm.com/code/open/centers/codait/&tags=AI Fairness 360,IBM Code Model Asset Exchange&title=Test

"""

import os
from flask import Flask, request, jsonify
import SubmitToQueue
import json

try:
    leaves_port = os.environ["LEAVES_API_PORT"]
except:
    leaves_port = 5500

app = Flask(__name__)

@app.route('/params')
def params():
    try:
        title = request.args['title'];
    except:
        title = 'dummy';

    try:
        url = request.args['url'];
    except:
        url = 'dummy';

    try:
        tags = request.args['tags'];
    except:
        tags = 'dummy';

    if url == 'dummy' or url.strip() == "" :
        return jsonify({"Status": "Failed - URL is missing"})
    SubmitToQueue.publishToRedis(title, url, tags)
    return jsonify({"Status":"Completed"})

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=leaves_port)