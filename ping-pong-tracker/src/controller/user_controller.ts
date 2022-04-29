import { User } from '../models/user_model.js'

export class user_controller {

    static async getUser(req, res) {
        let response = await User.getUser(req.params)
        res.status(response.status).send(response.body)
    }
    
    static async addUser(req, res) {
        let response = await User.addUser(req.body)
        res.status(response.status).send(response.body)
    }

    static async updateUser(req, res) {
        let response = await User.updateUser(req.body)
        res.status(response.status).send(response.body)
    }

    static async deleteUser(req, res) {
        let response = await User.deleteUser(req.body)
        res.status(response.status).send(response.body)
    }
}