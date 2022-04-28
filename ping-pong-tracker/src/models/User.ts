export class User {

    guid?: String
    password?: String
    player_name?: String
    username: String
    active: Boolean

    constructor(username: String){
        this.username = username
    }

    async getUser(conn: any) {

        let response
        try {
            if (this.username) {
                response = await conn.select().table('players')
            }
            let record = await conn.select().table('players').where({username: this.username})
            
            response = {
                status: 200,
                body: record
            }
        } catch {
            response = {
                status: 500,
                body: 'Internal Server Error'
            }
        }
        
        return response

    }

    async addUser(conn: any, player_name: String, password?: String){

        let response
        try {
            
            let userExists = await this._userExists(conn)
            if(!userExists){
                await conn('players').insert({
                    username: this.username,
                    active: 1,
                    player_name: player_name
                })
    
                let guid = await this._getGuid(conn)
    
                response = {
                    status: 201,
                    body: {
                        username: this.username,
                        fullName: player_name,
                        guid: guid
                    }
                }
            } else {
                response = {
                    status: 409,
                    body: 'User Already Exists'
                }
            }
            

        } catch {
            response = {
                status: 500,
                body: 'Internal Server Error'
            }
        }

        return response

    }

    async updateUser(conn: any, body: object){
        
        let response
        try {
            let guid = await this._getGuid(conn)

            if(body['fullName']) await conn('players').where({guid: guid}).update({player_name:body['fullName']})
            if(body['active'] !== undefined) await conn('players').where({guid: guid}).update({active:body['active']})
            if(body['password']) await conn('players').where({guid: guid}).update({password:body['password']})

            let record = await conn.select().table('players').where({guid: guid})

            response = {
                status: 201,
                body: record
            }

        } catch {
            response = {
                status: 500,
                body: 'Internal Server Error'
            }
        }

        return response
    }

    async deleteUser(conn: any){
        
        let response
        try {
            let guid = await this._getGuid(conn)
            await conn('players').where({
                guid: guid
            }).del()

            response = {
                status: 200,
                body: {
                    username: this.username,
                    guid: guid
                }
            }
        } catch {
            response = {
                status: 500,
                body: 'Internal Server Error'
            }
        }

        return response

    }


    async _getGuid(conn: any){

        let record =  await conn.select().table('players').where({username: this.username})
        console.log(this.username)
        console.log(record)
        
        if (record.length != 0) return record[0]['guid']
        
        return false

    }

    async _userExists(conn){

        let record = await this._getGuid(conn)
        console.log(record)
        return record !== false ? true : false

    }

}