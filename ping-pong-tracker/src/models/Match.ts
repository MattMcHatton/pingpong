import { IMatch } from "./Interfaces"

export class Match {

    guid?: String
    home_user: String
    away_user: String
    match_date: Date
    winner?: String

    constructor({home_user, away_user, match_date}: IMatch){
        this.home_user = home_user,
        this.away_user = away_user,
        this.match_date = match_date
    }

    async getMatch(conn: any, home_user: String, away_user: String, match_date: Date){
        let response

        try {
            let home_user_guid = await conn.select().table('players').where({username: home_user})
            let away_user_guid = await conn.select().table('players').where({username: away_user})
    
            response = await conn.select().table('players').where({
                home_user_id: home_user_guid,
                away_user_id: away_user_guid,
                match_date: match_date
            })
        } catch {
            response = {
                status: 500,
                body: 'Internal Server Error'
            }
        }

        return response

    }

    async recordMatch(){ 
        return
    }

    async _getUserGuid(conn: any, home_user: String, away_user: String){

        return

    }

    async _getMatchGuid(conn: any, home_user: String, away_user: String){
        return 

    }

}

