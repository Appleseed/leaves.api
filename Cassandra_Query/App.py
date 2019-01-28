# Written by Jagannath Bilgi <jsbilgi@yahoo.com>
"""
Creates web service on localhost port 6500 for retrieving data from cassandra
Expects id to be retrived

example


"""
import os
from flask import Flask, request, jsonify
import Cas_Query
import json

try:
    leaves_api_cas_port = os.environ["LEAVES_API_CAS_PORT"]
except:
    leaves_api_cas_port = 6500

app = Flask(__name__)

@app.route('/params')
def params():
    try:
        id = request.args['id'];
        id = int(id)
    except Exception as e:
        with open('error.log', 'a') as the_file:
            the_file.write(str(e) +'\n')
        id = 1
    res_set = (Cas_Query.query(id))
    doc = Cas_Query.parse_cas_result_set(res_set)
    if doc:
        return jsonify(doc)
    else:
        return jsonify({"Status": "No data found"})
@app.route('/')
def params1():
    try:
        page_no = request.args['page'];
        page_no = int(page_no)
    except :
        page_no = 1

    try:
        batch_size = request.args['batch'];
        batch_size = int(batch_size)
    except :
        batch_size = 10

    res_set = Cas_Query.query_batch(page_no=page_no,batch_size=batch_size)
    if res_set != None:
        return jsonify(res_set)
    else:
        return jsonify({"Status":"No data found"})

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=leaves_api_cas_port)
    # params()