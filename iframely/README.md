This is the iframely part of the Leaves API Endpoint: /meta/card?url=http://www.example.com/article.html 

In order to run this, you must do the following:
Download the zip, get the folder within the zip file
Open Docker
Run the following:
docker build -t iframely:latest .
docker run -it -p 8061:8061 -v $PWD/config.local.js:/iframely/config.local.js --name iframely iframely:latest
docker stop iframely
