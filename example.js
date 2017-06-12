var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:15105qq@localhost:17474');

var node = db.createNode({
  query: 'MATCH (u:User {email: {email}}) RETURN u',
  params: {
    email: 'alice@example.com',
  }});     // instantaneous, but...
node.save(function (err, node) {    // ...this is what actually persists.
  if (err) {
    console.error('Error saving new node to database:', err);
  } else {
    console.log('Node saved to database with id:', node.id);
  }
});