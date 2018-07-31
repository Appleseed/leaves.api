# Leaves API 
### Anant Corporation  
#### Developed by Ankit Gupta (Apprentice) and Rahul Singh (CEO)  
**Description:** Given a URL, several processes are executed and returned back as a complete dataset in JSON. Since all of the sub components are available as Node Packages (NPM), we can run this all in docker container as part of one express based REST API
**Endpoints:**
Below are the endpoints expressed in the Anant Leaves API with the folders within this repository that correspond to each endpoint.  

- /content/full?url=http://www.example.com/article.html (Full_Raw_Data but inside JSON)
- /content/raw?url=http://www.example.com/article.html (Full_Raw_Data but passed through)
- /content/read?url=http://www.example.com/article.html (Readable inside JSON)
- /content/text?url=http://www.example.com/article.html (Text inside JSON)

- /meta/pagerank?url=http://www.example.com/article.html (Page_Rank inside JSON)
- /meta/card?url=http://www.example.com/article.html (Card HTML inside JSON)

- /images/first?url=http://www.example.com/article.html (Image contents)
- /images/thumb/large?url=http://www.example.com/article.html (Image_Large contents)
- /images/thumb/medium?url=http://www.example.com/article.html (Image_Medium contents)
- /images/thumb/small?url=http://www.example.com/article.html (Image_Small contents)
