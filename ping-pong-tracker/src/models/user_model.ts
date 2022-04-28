import conn from '../util/database.js'

export class User {

    static async getUser(username: String) {

        try {
            if (username) { let record = await conn.select().table('players') }
            let record = await conn.select().table('players').where({username: username})
            return {
                status: 200,
                body: record
            }
        } catch {
            return {
                status: 500,
                body: 'Internal Server Error'
            }
        }

    }

    static async addUser(body: object){

        let username = body['username']
        let player_name = body['fullName']

        try {
            
            let userExists = await this._userExists(username)
            if(!userExists){
                await conn('players').insert({
                    username: username,
                    active: 1,
                    player_name: player_name
                })
    
                let guid = await this._getGuid(username)
    
                return {
                    status: 201,
                    body: {
                        username: username,
                        fullName: player_name,
                        guid: guid
                    }
                }
            } else {
                return {
                    status: 409,
                    body: 'User Already Exists'
                }
            }
            

        } catch {
            return {
                status: 500,
                body: 'Internal Server Error'
            }
        }
    }

    static async updateUser(body: object){
        
        let username = body['username']

        try {
            let guid = await this._getGuid(body['username'])

            if(body['fullName']) await conn('players').where({guid: guid}).update({player_name:body['fullName']})
            if(body['active'] !== undefined) await conn('players').where({guid: guid}).update({active:body['active']})
            if(body['password']) await conn('players').where({guid: guid}).update({password:body['password']})

            let record = await conn.select().table('players').where({guid: guid})

            return {
                status: 201,
                body: record
            }

        } catch {
            return {
                status: 500,
                body: 'Internal Server Error'
            }
        }

    }

    static async deleteUser(body: object){
        
        let username = body['username']

        try {
            let userExists = await this._userExists(username)
            if (!userExists){
                return {
                    status: 200,
                    body: []
                }
            }
            let guid = await this._getGuid(username)
            await conn('players').where({
                guid: guid
            }).del()

            return {
                status: 200,
                body: {
                    username: username,
                    guid: guid
                }
            }
        } catch {
            return {
                status: 500,
                body: 'Internal Server Error'
            }
        }

    }

    static async _getGuid(username: String){

        let record =  await conn.select().table('players').where({username: username})
        if (record.length != 0) return record[0]['guid']
        return false

    }

    static async _userExists(username: String){

        let record = await this._getGuid(username)
        return record !== false ? true : false

    }

}