import mysql.connector as mariadb
import json
import os

mysqluser = os.environ["DATABASE_USER"]
mysqlpassword = os.environ["DATABASE_PASSWORD"]
mysqldatabase = os.environ["DATABASE_NAME"]
mysqlhost_db = os.environ["DATABASE_HOST"]
mysqlport = os.environ["DATABASE_PORT"]

def getTagCount():
    mariadb_connection = mariadb.connect(user=mysqluser, password=mysqlpassword, database=mysqldatabase,host=mysqlhost_db,port=mysqlport)
    cursor = mariadb_connection.cursor()
    cursor.execute("select wt.id as id, wt.label as label, wt.slug as slug, count(1) as no_of_links from wallabag_entry_tag wet, wallabag_tag wt where wt.id = wet.tag_id group by wt.label, wt.slug, wt.id")
    row_headers = [x[0] for x in cursor.description]  # this will extract row headers
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers, result)))
    return json.dumps(json_data)

# if __name__ == '__main__':
#     print(getTagCount())
