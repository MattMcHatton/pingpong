import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import user_routes from './routes/user_routes.js'
import match_routes from './routes/match_routes.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(user_routes)
app.use(match_routes)


app.listen(port, () => console.log(`Listening on port ${port}`));


// //get a match
// app.get('/match', async (req, res) => {

//   let match: Match 
//   const home_user: String = String(req.query['home_user'])
//   const away_user = String(req.query['away_user'])
//   const match_date = String(req.query['match_date'])

//   const db: dbConnect = new dbConnect(config)

//   if (home_user != 'undefined' && away_user != 'undefined' && match_date != 'undefined') {
//     match = new Match({
//       home_user: home_user,
//       away_user: away_user,
//       match_date: match_date
//     }) 
//   } else {
//     match = new Match({})
//   }

//   const response: Response = await match.getMatch(db.conn)

//   res.status(response.status).send(response.body)

// })

// //create a new match
// app.post('/match', async (req, res) => {

//   const body = req.body
//   const db: dbConnect = new dbConnect(config)
//   const match: Match = new Match({
//     home_user: body.homeUser, 
//     away_user: body.awayUser, 
//     match_date: body.matchDate
//   })
//   const response: Response = await match.recordMatch(db.conn)

//   res.status(response.status).send(response.body)

// })

// //get rounds from a match
// app.post('/round', async (req, res) => {
//   return
// })

// //record rounds from a match
// app.post('/round', async (req, res) => {
//   return
// })


