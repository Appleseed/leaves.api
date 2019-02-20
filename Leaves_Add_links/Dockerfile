FROM python:3.6

# Install prerequisites
RUN python3.6 -m pip install redis \
	&& python3.6 -m pip install flask 

RUN pip3 install mysql-connector

WORKDIR /leaves.api
ADD . /leaves.api

CMD ["python", "App.py"]
