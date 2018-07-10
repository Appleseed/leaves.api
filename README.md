Leaves API:
Desc: Given a URL, several processes are executed and returned back as a complete dataset in JSON. 
AC: 1) Initial version runs separate REST apis in a docker container and uses an NGINX proxy to expose end points. 2) Second version exposes a higher level API which takes a URL and a callback URL as an input. It spawns the component processes to gather data and then once complete it POSTs the data to the call back URL. 

Vision: Our Leaves interface currently uses Wallabag to a) scrape the readable contents b) find a representative image and c) serve up this data via a REST API. I want to be able to replace this with a better API which will store it’s data in Cassandra. 

Purpose: The purpose of this API will be to augment the Wallabag API and eventually replace it .
