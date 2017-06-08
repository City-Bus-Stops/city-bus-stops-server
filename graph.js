const request = require('request');

var doDatabaseOperation = function (query, params) {
  return new Promise(function (resolve, reject) {
    request.post({
        uri: 'http://neo4j:15105qq@localhost:17474/db/data/transaction/commit',
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
var query="CREATE (ee:Relation) WHERE ee.name = 'Paul' RETURN ee;";

var promise = doDatabaseOperation(query)
promise.then(function (data) {
  console.log(data.results[0].data)
})
.catch(function (err) {
  console.log(err)
});