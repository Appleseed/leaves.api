### Anant Corporation  
Developed by Ankit Gupta (Apprentice), Jagannath Bilgi and Rahul Singh (CEO)  

### Below are different REST api used in leaves interface
- Leaves Metadata
- Leaves Add links
- Cassandra Query
- Pocket Thumber

#### Leaves Metadata
**Description:** Objective of the api is to crawl through given url and return content in different format based on parameter passed. Below options are available

	full - Returns site's (url) html content in json format. 
		Example - http://stage.leaves.anant.us/api/metadata/content/full/?url=https://example.com
	raw -  Returns site content as page
		Example - http://stage.leaves.anant.us/api/metadata/content/raw/?url=https://example.com
	text -  Returns site content as plain text
		Example - http://stage.leaves.anant.us/api/metadata/content/text/?url=https://example.com
	read -  Returns site content as reader page
		Example - http://stage.leaves.anant.us/api/metadata/content/read/?url=https://example.com
	pagerank -  Returns site's page rank
		Example - http://stage.leaves.anant.us/api/metadata/meta/pagerank?url=http://www.example.com/
	card -  Returns site's card
		Example - http://stage.leaves.anant.us/api/metadata/meta/card?url=http://www.example.com/
	first -  Returns site's image with actual size (320 X 480)
		Example - http://stage.leaves.anant.us/api/metadata/images/first?url=example.com
	large -  Returns site's image with increased size (2048 X 898)
		Example - http://stage.leaves.anant.us/api/metadata/images/thumb/large?url=www.example.com
	medium -  Returns site's image with actual size (1024 X 449)
		Example - http://stage.leaves.anant.us/api/metadata/images/thumb/medium?url=www.example.com
	small -  Returns site's image with actual size (512 X 224)
		Example - http://stage.leaves.anant.us/api/metadata/images/thumb/small?url=www.example.com

#### Leaves Add links
**Description:** Used for adding links to wallabag and cassandra. Process receives url, title and tags as input.
Title and tags are optional. Multiple tags are separated with comma. As a part of processing, Url is moved to redis queue. 
Other queue processing event pull message from redis queue and process it further. 

#### Cassandra Query
**Description:** Data persisted in Cassandra is retrieved and provided to end user. Output is similar to wallabag REST api.
Below 2 options are available for getting data from Cassandra

- Default: http://stage.leaves.anant.us/api/cassandra/.
- Query on specific url : http://stage.leaves.anant.us/api/cassandra/?id=1006

 
