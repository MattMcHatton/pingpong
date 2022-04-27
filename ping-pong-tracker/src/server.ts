import express from 'express'
import { dbConnect } from './util/dbConnect.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { config } from './config/config.js'
import { User } from './models/User.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/user/:username', async (req, res) => {

  const user: User = new User(req.params.username)
  const db: dbConnect = new dbConnect(config)
  const response: Response = await user.getUser(db.conn)
  
  res.status(response.status).send(response.body)

});

app.post('/user', async (req, res) => {
  
  const body = req.body
  const db: dbConnect = new dbConnect(config)
  const user: User = new User(body.username)
  const response: Response = await user.addUser(db.conn, body.fullName)
  
  res.status(response.status).send(response.body)

});

app.put('/user', async (req, res) => {

  const body = req.body
  const db: dbConnect = new dbConnect(config)
  const user: User = new User(body.username)
  const response: Response = await user.updateUser(db.conn, body)
  
  res.status(response.status).send(response.body)

})

app.delete('/user', async (req, res) => {

  const body = req.body
  const db: dbConnect = new dbConnect(config)
  const user: User = new User(body.username)
  const response: Response = await user.deleteUser(db.conn)
  
  res.status(response.status).send(response.body)

})

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


