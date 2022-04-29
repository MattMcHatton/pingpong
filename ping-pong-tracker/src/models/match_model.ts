import conn from '../util/database.js'

export class Match {

    static async getMatch(queryParams: object){

        let home_user = queryParams["home_user"]
        let away_user = queryParams["away_user"]
        let match_date = queryParams["match_date"]

        try {

            if(!(!!home_user && !!away_user && !!match_date)) { 
                let records = await conn.select().table('matches') 
                return {
                    status: 200,
                    body: records
                }
            }

            let home_user_guid = await this._getUserGuid(home_user)
            let away_user_guid = await this._getUserGuid(away_user)

            let records = await conn.select().table('matches').where({
                home_user_id: home_user_guid,
                away_user_id: away_user_guid,
                match_date: match_date
            })

            return {
                status: 200,
                body: records
            }

        } catch (err) {
            return {
                status: 500,
                body: err
            }
        }

    }

    static async recordMatch(body: object){ 

        let home_user = body["homeUser"]
        let away_user = body["awayUser"]
        let match_date = body["matchDate"]

        try {

            let home_user_guid = await this._getUserGuid(home_user)
            let away_user_guid = await this._getUserGuid(away_user)

            await conn('matches').insert({
                home_user_id: home_user_guid,
                away_user_id: away_user_guid,
                match_date: match_date
            })

            let guid = await this._getMatchGuid(home_user_guid, away_user_guid, match_date)
            console.log(guid)

            return {
                status: 201,
                body: {
                    home_user: home_user,
                    away_user: away_user,
                    match_date: match_date,
                    guid: guid
                }
            }
        } catch (err) {
            return {
                status: 500,
                body: err
            }
        }

    }

    static async updateMatch(match_id: String, body: object){
        
        let winner = body['winner']
        let isValid = await this._isValid(winner, match_id)

        try {

            await conn('matches').update({
                winner: winner
            }).where({match_guid: match_id})
            if (isValid){
                return {
                    status: 200,
                    body: {
                        match_id: match_id,
                        winner: winner
                    }
                }
            }

            return {
                status: 409,
                body: `${winner} is not a valid input`
            }

        } catch(err) {
            return {
                status: 500,
                body: err
            }
        }
        

    }

    static async addRound(match_id: String, body){
        
        let round_number = body['round_number']
        let home_score = body['home_score']
        let away_score = body['away_score']

        await conn('rounds').insert({
            match_id: match_id,
            round_number: round_number,
            home_score: home_score,
            away_score: away_score
        })
        
        return {
            status: 201,
            body: {
                match_id: match_id,
                round_number: round_number,
                home_score: home_score,
                away_score: away_score
            }
        }
    }

    static async getRound(match_id: String, queryParams: object){
        
        try{
            let result
            if(Object.keys(queryParams).length != 0) {
                let round_number = queryParams['round_number']
                result = await conn('rounds').select().where({
                    match_id: match_id,
                    round_number: round_number
                })
            } else {
                result = await conn('rounds').select().where({
                    match_id: match_id
                })
            }
            return {
                status: 200,
                body: result
            }
        } catch (err){
            return {
                status: 500,
                body: err
            }
        }

    }

    static async _isValid(username: String, match_id: String) {
        let match = await conn('matches').select().where({match_guid: match_id})
        return (match[0]['away_user_id'] === username || match[0]['home_user_id'] === username ) === true ? true : false
    }

    static async _getUserGuid(username: String){

        let record =  await conn.select().table('players').where({username: username})
        return record[0]['guid']

    }

    static async _getMatchGuid(home_user_guid, away_user_guid, match_date){

        let record = await conn.select().table('matches').where({
            home_user_id: home_user_guid,
            away_user_id: away_user_guid,
            match_date: match_date
        })
        return record[0]['match_guid']

    }

}

