const express = require('express');
const database = require('./util/dbConnect.js')
const queryBuilder = require('./util/queryBuilder.js')
const config = require('./config/config.js');


const app = express();
const port = process.env.PORT || 5000;
const query = new queryBuilder();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/user', async (req, res) => {

  var db = new database(config)
  var query = new queryBuilder()
  db.sendRequest(query.getUsers('matt.mchatton@dialexa.com'));

});

app.post('/user', (req, res) => {
  console.log('Calling POST');
  res.send(
    'Received a call to the POST user endpoint'
  )
});


