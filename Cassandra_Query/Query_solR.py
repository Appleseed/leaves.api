# Written by Jagannath Bilgi <jsbilgi@yahoo.com>
import os
import requests
import configparser

config = configparser.ConfigParser()
config.read('config.ini')

# Solr endpoints for each collection
try:
    POST_EP = os.environ["LEAVES_SOLR_URL"]
except:
    POST_EP = config['DEFAULT']['post_ep']

def query_solr(page_no = 1, batch_size=10):
   try:
        res = requests.get(POST_EP + '/select?' + 'fq=id:[300 TO 400]' + '&fl=id&q=*:*&rows=' + str(batch_size) + "&sort=id asc" + "&start=" + str((page_no-1)*batch_size),verify=False)
        target_id_list = []
        doc_dict = {}
        for parse_response in res.json().values():
            try:
                if (parse_response['docs']) :
                    doc_dict['numFound'] = parse_response['numFound']
                    doc_dict['page'] = page_no
                    for doc in parse_response['docs']:
                        target_id_list.append(doc['id'])
            except:
                pass
        doc_dict['doc_id_list'] = target_id_list
        return doc_dict;
   except Exception as e:
       print("Error ", str(e))
       return

def main():
    try:
        query_solr()
    except Exception as e:
        print("Error ", str(e))

if __name__ == '__main__':
    main()
