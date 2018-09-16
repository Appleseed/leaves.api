# Written by Jagannath Bilgi <jsbilgi@yahoo.com>

import redis
import time

"""

This module reads csv entries generated using "Base_awesome_transform" and queue's csv entries into redis message queue in format
Title, URL, Tags 

# tags can be null or comma separated value. Below is sample message

Frontend Development,https://github.com/dypsilon/frontend-dev-bookmarks,"sindresorhus,Platforms"

"""

queue_name = 'awesome';
def publishToRedis(title, url, tag):
        r = redis.client.StrictRedis(host='redis')
        row = title + ',' + url + ',' + tag
        if len(row) != 0:
            print ('Sending ',row)
            r.publish(queue_name, row)
            time.sleep(1)

