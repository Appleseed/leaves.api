import os
from cassandra.cluster import Cluster

import Query_solR
import math
try:
    leaves_api_cas_host = os.environ["LEAVES_API_CAS_HOST"]
except:
    leaves_api_cas_host = '206.189.143.212'

cluster = Cluster([leaves_api_cas_host])
session = cluster.connect('wallabag_cass')
id_list = []
def parse_cas_result_set(result_set):
    doc = {}
    if result_set != None:
        docs_list = ""
        for rs in result_set:
            docs_list = rs
        if docs_list != "":
            for rs in docs_list:
                doc_detail_temp = rs
                doc_detail = doc_detail_temp.replace('\\"', "~~").replace("'", "^^").replace(', "',
                                                                                             ', ""')  # Since content is free form text data; '\"' and single quote and field seperaters replaced.
                list = doc_detail[1:-1].split(', "')
                for doc_element in list:
                    ii = doc_element.replace('": ', '":$$ ')
                    keyvalue = ii.split(':$$ ')
                    k = keyvalue[0].replace('"', '')
                    v = keyvalue[1].replace('"', '').replace('~~', '"').replace('^^', "'")
                    if k in ("headers,published_by"):
                        v = v.replace('N;', 'null')
                    if k in ("is_archived,is_starred,reading_time"):
                        v = int(v)
                    if k in ("label"):
                        k = "tags"
                    doc[k] = v
    return doc

def query(id):
    try:
        statement = session.prepare("SELECT JSON * FROM wallabag_by_id Where id=?;")
        rows = session.execute(statement, [id])
        return rows
    except Exception as e:
        print("error " + str(e))
        with open('error.log', 'a') as the_file:
            the_file.write('cas read error ' + str(e) +'\n')
        return

def query_batch(page_no=1, batch_size=10):
    docs = []
    id_list = Query_solR.query_solr(page_no=page_no, batch_size=batch_size)
    docs_dict = {}
    for doc_id in id_list['doc_id_list']:
        solR_Resp = query(int(doc_id))
        if solR_Resp != None:
            doc = parse_cas_result_set(solR_Resp)
            if doc:
                docs.append(doc)
    if docs:
        docs_dict['page'] = id_list['page']
        docs_dict['limit'] = batch_size
        docs_dict['pages'] = math.ceil(id_list['numFound']/batch_size)
        docs_dict['total'] = id_list['numFound']
        docs_dict['_embedded'] = {"items":docs}
    return docs_dict

def main():
    try:
        query_batch(page_no=1,batch_size=20)
    except Exception as e:
        print("Error ", str(e))

if __name__ == '__main__':
    main()
