import conn from '../util/database.js'

export class User {

    static async getUser(params: object) {
        let username = params['username']
        try {
            if (!(!!username)) { 
                let records = await conn.select().table('players')
                records.forEach(record => {
                    delete record['password']
                })
                return {
                    status: 200,
                    body: records
                }
            }
            let record: any = await conn.select().table('players').where({username: username}).first()
            delete record['password']
            return {
                status: 200,
                body: record
            }
        } catch (err){
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
                    body: `${username} already exists`
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
        let updatedAt = new Date()

        try {
            let guid = await this._getGuid(username)

            if(body['fullName']) await conn('players').where({guid: guid}).update({player_name:body['fullName'], updated_at: updatedAt})
            if(body['active'] !== undefined) await conn('players').where({guid: guid}).update({active:body['active'], updated_at: updatedAt})
            if(body['password']) await conn('players').where({guid: guid}).update({password:body['password'], updated_at: updatedAt})

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

        let record = await conn.select('guid').table('players').where({username: username})
        if (record.length != 0) return record[0]['guid']
        return false

    }

    static async _userExists(username: String){

        let record = await this._getGuid(username)
        return record !== false ? true : false

    }

}