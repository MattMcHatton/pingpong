const express = require('express');
const { sendResponse } = require('next/dist/server/image-optimizer');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/user', (req, res) => {
  res.send({body: "Hello World!"})
  console.log('Calling GET')
});

app.post('/user', (req, res) => {
  console.log('Calling POST');
  res.send(
    'Received a call to the POST user endpoint'
  )
});
