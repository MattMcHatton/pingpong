const express = require('express');
const database = require('./util/dbConnect.js')
const config = require('./config/config.js')

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/user', async (req, res) => {
  res.send({body: "Hello World!"})
  console.log('Calling GET')

  var db = new database(config)
  db.sendRequest('select * from players');

});

app.post('/user', (req, res) => {
  console.log('Calling POST');
  res.send(
    'Received a call to the POST user endpoint'
  )
});


