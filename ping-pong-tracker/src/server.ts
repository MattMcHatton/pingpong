import express from 'express'
import { dbConnect } from './util/dbConnect.js'
import { config } from './config/config.js'
import { User } from './models/User.js'
import Knex from 'knex'

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/user/:username', async (req, res) => {

  const user: User = new User(req.params.username)
  const db: dbConnect = new dbConnect(config)
  const body: object = await user.getUser(db.conn)
  res.status(200).send(body)

});

app.post('/user', async (req, res) => {
  res.send(
    'Received a call to the POST user endpoint'
  )
});

//get a match
app.get('/match', async (req, res) => {
  
  return
})

//create a new match
app.post('/match', async (req, res) => {
  return
})

//get rounds from a match
app.post('/round', async (req, res) => {
  return
})

//record rounds from a match
app.post('/round', async (req, res) => {
  return
})


