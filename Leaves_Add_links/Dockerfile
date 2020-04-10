FROM python:3.6

# Install prerequisites
RUN python3.6 -m pip install redis \
	&& python3.6 -m pip install flask \
	&& python3.6 -m pip install flask_cors

#RUN pip3 install mysql-connector
RUN pip install mysql-connector-python

WORKDIR /leaves.api
ADD . /leaves.api

CMD ["python", "App.py"]
