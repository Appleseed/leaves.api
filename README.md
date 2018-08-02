# Leaves API 
### Anant Corporation  
#### Developed by Ankit Gupta (Apprentice) and Rahul Singh (CEO)  
**Description:** Given a URL, several processes are executed and returned back as a complete dataset in JSON. Since all of the sub components are available as Node Packages (NPM), we can run this all in docker container as part of one express based REST API
**Endpoints:**
Below are the endpoints expressed in the Anant Leaves API with the folders within this repository that correspond to each endpoint.  

- /content/full/example.com (Full_Raw_Data but inside JSON)
- /content/raw/example.com (Full_Raw_Data but passed through)
- /content/read/example.com (Readable inside JSON)
- /content/text/example.com (Text inside JSON)

- /meta/pagerank/example.com (Page_Rank inside JSON)
- /meta/card/example.com (Card HTML inside JSON)

- /images/first/example.com (Image contents)
- /images/thumb/large/example.com (Image_Large contents)
- /images/thumb/medium/example.com (Image_Medium contents)
- /images/thumb/small/example.com (Image_Small contents)  
- /content/all/example.com/localhost:8081.content.callback  

