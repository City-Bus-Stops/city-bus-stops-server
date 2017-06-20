const request = require('request');

var doDatabaseOperation = function (query, params) {
  return new Promise(function (resolve, reject) {
    request.post({
        uri: 'http://neo4j:12345q@localhost:7474/db/data/transaction/commit',
        json:{
          statements:[
            {
              statement:query,
              parameters:params
            }
          ]
        }
      },
      function(err,res){
        if(err)
          reject(err)
        else
          resolve(res.body)
      })
  });
};
var query=`CREATE (id320409830:Node {name:'Фолюш'}),
(id2365478997:Node {name:'Мини-рынок'}),
(id320409842:Node {name:'улица Лизы Чайкиной'}),
(id320409845:Node {name:'площадь Декабристов'}),
(id320409795:Node {name:'улица Поповича'}),
(id1015286533:Node {name:'Обувная фабрика'}),
(id1328437289:Node {name:'улица Гагарина'}),
(id1256772885:Node {name:'Больница №2'}),
(id769847386:Node {name:'улица Горновых'}),
(id969186894:Node {name:'Советская площадь'}),
(id445394323:Node {name:'Дом связи'}),
(id431330918:Node {name:'улица Карбышева'}),
(id2574266485:Node {name:'улица Будённого'}),
(id431335367:Node {name:'Железнодорожный вокзал'})

CREATE
(id320409830)-[:HAVE_RELATION {ids: [1299208]}]->(id2365478997),
(id2365478997)-[:HAVE_RELATION {ids: [1299208]}]->(id320409842),
(id320409842)-[:HAVE_RELATION {ids: [1299208]}]->(id320409845),
(id320409845)-[:HAVE_RELATION {ids: [1299208]}]->(id320409795),
(id320409795)-[:HAVE_RELATION {ids: [1299208]}]->(id1015286533),
(id1015286533)-[:HAVE_RELATION {ids: [1299208]}]->(id1328437289),
(id1328437289)-[:HAVE_RELATION {ids: [1299208]}]->(id1256772885),
(id1256772885)-[:HAVE_RELATION {ids: [1299208]}]->(id769847386),
(id769847386)-[:HAVE_RELATION {ids: [1299208]}]->(id969186894),
(id969186894)-[:HAVE_RELATION {ids: [1299208]}]->(id445394323),
(id445394323)-[:HAVE_RELATION {ids: [1299208]}]->(id431330918),
(id431330918)-[:HAVE_RELATION {ids: [1299208]}]->(id2574266485),
(id2574266485)-[:HAVE_RELATION {ids: [1299208]}]->(id431335367)`;

var promise = doDatabaseOperation(query)
promise.then(function (data) {
  console.log(data.results[0].data)
})
.catch(function (err) {
  console.log(err)
});