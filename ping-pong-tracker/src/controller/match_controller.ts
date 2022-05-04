import { Match } from '../models/match_model.js'

export class match_controller {

    static async getMatch(req, res) {
        let response = await Match.getMatch(req.query)
        res.status(response.status).send(response.body)
    }

    static async getSingleMatch(req, res) {
        let response = await Match.getSingleMatch(req.params)
        res.status(response.status).send(response.body)
    }
    
    static async recordMatch(req, res) {
        let response = await Match.recordMatch(req.body)
        res.status(response.status).send(response.body)
    }

    static async updateMatch(req, res) {
        let response = await Match.updateMatch(req.params, req.body)
        res.status(response.status).send(response.body)
    }

    static async addRound(req, res) {
        let response = await Match.addRound(req.params, req.body)
        res.status(response.status).send(response.body)
    }

    static async getRound(req, res) {
        let response = await Match.getRound(req.params, req.query)
        res.status(response.status).send(response.body)
    }

}