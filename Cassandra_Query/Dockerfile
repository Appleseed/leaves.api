FROM python:3.6

# Install prerequisites
RUN python3.6 -m pip install cassandra-driver \
	&& python3.6 -m pip install flask \
    && python3.6 -m pip install aiohttp \
    && python3.6 -m pip install requests 

WORKDIR /leaves.api.query
ADD . /leaves.api.query

CMD ["python", "App.py"]
