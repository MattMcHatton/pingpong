import { Match } from '../models/Match_model.js'

export class match_controller {

    static async getMatch(req, res) {
        let response = await Match.getMatch(req.query)
        res.status(response.status).send(response.body)
    }
    
    static async recordMatch(req, res) {
        let response = await Match.recordMatch(req.body)
        res.status(response.status).send(response.body)
    }

    static async updateMatch(req, res) {
        let response = await Match.updateMatch(req.params.match_id, req.body)
        res.status(response.status).send(response.body)
    }

}