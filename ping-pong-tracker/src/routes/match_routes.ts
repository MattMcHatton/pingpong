import express from 'express'
import { match_controller } from '../controller/match_controller.js'
var match_router = express.Router();


match_router.get('/match', match_controller.getMatch )

match_router.post('/match', match_controller.recordMatch )

match_router.get('/match/:match_id', match_controller.getSingleMatch )

match_router.put('/match/:match_id', match_controller.updateMatch )

match_router.get('/match/:match_id/round', match_controller.getRound )

match_router.post('/match/:match_id/round', match_controller.addRound )


export default match_router