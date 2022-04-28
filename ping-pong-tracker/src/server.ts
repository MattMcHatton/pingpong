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
