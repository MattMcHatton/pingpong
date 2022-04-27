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
        if (!this.username) {
            response = await conn.select().table('players').then(res => console.log(res))
        }
        response = await conn.select().table('players').where({username: this.username})
        return response

    }

    async addUser(conn: any, player_name: String, password?: String){

        let response
        try {
            await conn('players').insert({
                username: this.username,
                active: 1,
                player_name: player_name
            })

            let guid = await this._getGuid(conn, this.username)

            response = {
                status: 201,
                body: {
                    username: this.username,
                    fullName: player_name,
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

    async updateUser(conn: any, body: object){
        
        let response
        try {
            let guid = await this._getGuid(conn, this.username)

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
            let guid = await this._getGuid(conn, this.username)
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


    async _getGuid(conn: any, username: String){

        let record =  await conn.select().table('players').where({username: this.username})
        return record[0]['guid']

    }

}