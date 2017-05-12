### What is it ?
* it is a server side for a [client](https://github.com/City-Bus-Stops/search-route/) application

### How to run ?
* first of all you need to install `yarn`
* install [docker](https://www.docker.com/) and `docker-compose` if you haven't it
* use `docker-compose up -d` to easy configure system

This command creates two containers: for mongodb and neo4j. So you may connect to MongoDB
through 127.0.0.1:27017 socket and to Neo4j through 127.0.0.1:7474.

* then use `yarn start` to start server

### What we have ?
#### API
- `GET /location`  to get geolocation points. Example:
```
GET /location?name=ул.%20Лиможа&base=Гродно
[
   {
      name: "улица Лиможа, Девятовка–1, Ленинский район, Гродно, Гродненская область, 230021,
      Беларусь",
      lat: "53.7069309",
      lon: "23.8496624"
   },
...
]
```
- `GET /address` to get address. Example:
```
GET /address?lat=53.70177645&lon=23.8347894179425
[
   {
      name: "OldCity, 17, улица Дубко, Девятовка, Ленинский район, Гродно"
   }
]
```
