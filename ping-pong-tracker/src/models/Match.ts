import { Input } from "@mui/material"
import { IMatch } from "./Interfaces"

export class Match {

    guid?: String
    home_user: String
    away_user: String
    match_date: String
    winner?: String

    constructor({home_user="", away_user="", match_date=""}: IMatch){        
        this.home_user = home_user,
        this.away_user = away_user,
        this.match_date = match_date
    }

    async getMatch(conn: any){
        let response

        try {
            let records

            if(this.home_user === "" || this.away_user === "" || this.match_date === "") { 
                records = await conn.select().table('matches') 
            } else {
                let home_user_guid = await this._getUserGuid(conn, this.home_user)
                let away_user_guid = await this._getUserGuid(conn, this.away_user)

                records = await conn.select().table('matches').where({
                    home_user_id: home_user_guid,
                    away_user_id: away_user_guid,
                    match_date: this.match_date
                })
            }

            response = {
                status: 200,
                body: records
            }

        } catch (err) {
            response = {
                status: 500,
                body: err
            }
        }

        return response

    }

    async recordMatch(conn: any){ 
        let response

        try {

            let home_user_guid = await this._getUserGuid(conn, this.home_user)
            let away_user_guid = await this._getUserGuid(conn, this.away_user)

            await conn('matches').insert({
                home_user_id: home_user_guid,
                away_user_id: away_user_guid,
                match_date: this.match_date
            })

            let guid = await this._getMatchGuid(conn, home_user_guid, away_user_guid)

            response = {
                status: 201,
                body: {
                    home_user: this.home_user,
                    away_user: this.away_user,
                    match_date: this.match_date,
                    guid: guid
                }
            }
        } catch (err) {
            response = {
                status: 500,
                body: err
            }
        }
        
        return response
    }

    async _getUserGuid(conn: any, username: String){

        let record =  await conn.select().table('players').where({username: username})
        return record[0]['guid']

    }

    async _getMatchGuid(conn: any, home_user_guid, away_user_guid){
        console.log('getting match guid - inside')
        let record = await conn.select().table('matches').where({
            home_user_id: home_user_guid,
            away_user_id: away_user_guid,
            match_date: this.match_date
        })
        return record[0]['match_guid']

    }

}

