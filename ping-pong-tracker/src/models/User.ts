export class User {

    guid?: string
    player_name?: string
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

    addUser(conn: any){
        return
    }

    deleteUser(conn: any){
        return
    }


}