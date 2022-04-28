import express from 'express'
import { match_controller } from '../controller/match_controller.js'
var match_router = express.Router();


match_router.get('/match', match_controller.getMatch )

match_router.post('/match', match_controller.recordMatch )


export default match_router