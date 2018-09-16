# Written by Jagannath Bilgi <jsbilgi@yahoo.com>
"""
Creates web service on localhost port 5000 for loading wallabag
Expects awesome site url and file name without any extensions

End point of awesomesite url should be readme.md

example

http://192.168.99.100:5500/params?arg1=sindresorhus&arg2=https://raw.githubusercontent.com/sindresorhus/awesome/master/readme.md&arg3="React Native,Salesforce"

"""

import os
from flask import Flask, request
import SubmitToQueue

try:
    leaves_port = os.environ["LEAVES_API_PORT"]
except:
    leaves_port = 5500

app = Flask(__name__)

@app.route('/params')
def params():
    try:
        arg1 = request.args['arg1'];
    except:
        arg1 = '';

    try:
        arg2 = request.args['arg2'];
    except:
        arg2 = '';

    try:
        arg3 = request.args['arg3'];
    except:
        arg3 = '';

    SubmitToQueue.publishToRedis(arg1, arg2, arg3)
    return "Completed"

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=leaves_port)