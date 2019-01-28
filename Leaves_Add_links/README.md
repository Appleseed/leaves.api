# Leaves API 
### Anant Corporation  
#### Developed by Ankit Gupta (Apprentice) and Rahul Singh (CEO)  
**Description:** Given a URL, several processes are executed and returned back as a complete dataset in JSON. This version runs separate REST apis in a Docker container and uses an NGINX proxy to expose end points.  
**Endpoints:**
Below are the endpoints expressed in the Anant Leaves API with the folders within this repository that correspond to each endpoint.  

- /content/full?url=http://www.example.com/article.html (Full_Raw_Data)
- /content/raw?url=http://www.example.com/article.html (Full_Raw_Data)
- /content/read?url=http://www.example.com/article.html (Read)
- /content/text?url=http://www.example.com/article.html (Text)

- /meta/pagerank?url=http://www.example.com/article.html (Page_Rank)
- /meta/card?url=http://www.example.com/article.html (Card)

- /images/first?url=http://www.example.com/article.html (Image)
- /images/thumb/large?url=http://www.example.com/article.html (Image_Large)
- /images/thumb/medium?url=http://www.example.com/article.html (Image_Medium)
- /images/thumb/small?url=http://www.example.com/article.html (Image_Small)
