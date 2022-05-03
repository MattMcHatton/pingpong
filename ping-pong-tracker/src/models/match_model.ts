import { userInfo } from 'os'
import conn from '../util/database.js'

export class Match {

    static async getMatch(queryParams: any){

        //object destructuring
        let { home_user,away_user,match_date,user } = queryParams

        try {

            //Edge case when home user, away user, and single user are passed
            if (home_user && away_user && user) {
                return {
                    status: 409,
                    body: "Cannot pass multi user and single user params."
                }
            }

            //If single user and date, send all records for that user and date, otherwise send all records for that user
            if(user && match_date) {
                return await this._singleUserAndDateGet(user, match_date)
            }

            if(user) {
                return await this._singleUserNoDateGet(user)
            }

            //If match date and both users are present
            if(home_user && away_user && match_date) {
                return await this._multiUserAndDateGet([home_user, away_user], match_date)
            }

            //If only match date is present
            if (match_date) {
                return await this._dateOnlyGet(match_date)
            } 

            //If both users present, but no match date pass all of their matches
            if (home_user && away_user) {
                return await this._multiUserNoDateGet([home_user, away_user])
            }

            //If no params, send all records
            let records = await conn.select().table('matches') 
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

    static async getSingleMatch(requestParams: object){
        
        let match_guid = requestParams['match_id']

        try {
            let record = await conn.select()
                .table('matches')
                .where({match_guid: match_guid})
                .limit(1)

            return {
                status: 200,
                body: record
            }

        } catch (err) {
            return {
                status: 500,
                body: err
            }
        }
        


    }

    static async recordMatch(body: object){ 

        let home_user = body["home_user"]
        let away_user = body["away_user"]
        let match_date = body["match_date"]

        try {

            let home_user_guid = await this._getUserGuid(home_user)
            let away_user_guid = await this._getUserGuid(away_user)

            await conn('matches').insert({
                home_user_id: home_user_guid,
                away_user_id: away_user_guid,
                match_date: match_date
            })

            let guid = await this._getMatchGuid(home_user_guid, away_user_guid, match_date)

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

    static async updateMatch(request_params: object, body: object){
        
        let match_id = request_params['match_id']
        let winner = body['winner']
        let match_date = body['match_date']
        
        try {
            if (winner) {
                let isValid = await this._isValid(winner, match_id)
                if (isValid){
                    await conn('matches').update({
                        winner: winner
                    }).where({match_guid: match_id})
                } else {
                    return {
                        status: 409,
                        body: `${winner} is not a valid input`
                    }
                }
            }
            
            if (match_date) {
                await conn('matches').update({
                    match_date: match_date
                }).where({match_guid: match_id})
            }


            return {
                status: 200,
                body: {
                    match_id: match_id,
                    winner: winner,
                    match_date: match_date
                }
            }

        } catch(err) {
            return {
                status: 500,
                body: err
            }
        }
        

    }

    static async addRound(request_params: object, body: object){
        
        let match_id = request_params['match_id']
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

    static async getRound(request_params: object, queryParams: object){
        let match_id = request_params['match_id']
        try{
            let result
            if(!this._emptyParams(queryParams)) {
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

    static _emptyParams(params: object){
        return (Object.keys(params).length === 0) === true ? true : false
    }

    static async _singleUserAndDateGet(user: String, match_date: any){
        let records
        let user_guid = await this._getUserGuid(user)

        records = await conn.select().table('matches')
        .whereRaw('(CONVERT(char(10), match_date ,126)) = ?', [match_date])
        .andWhere({
            home_user_id: user_guid,
        })
        .orWhereRaw('(CONVERT(char(10), match_date ,126)) = ?', [match_date])
        .andWhere({
            away_user_id: user_guid,
        })

        return {
            status: 200,
            body: records
        }
    }

    static async _singleUserNoDateGet(user: String) {

        let user_guid = await this._getUserGuid(user)

        let records = await conn.select().table('matches').where({
            home_user_id: user_guid,
        }).orWhere({
            away_user_id: user_guid,
        })

        return {
            status: 200,
            body: records
        }
    }

    static async _multiUserAndDateGet(users: String[], match_date: any){

        let records
        let [home_user, away_user] = users

        let home_user_guid = await this._getUserGuid(home_user)
        let away_user_guid = await this._getUserGuid(away_user)

        records = await conn.select().table('matches')
        .whereRaw('(CONVERT(char(10), match_date ,126)) = ?', [match_date])
        .andWhere({
            home_user_id: home_user_guid,
            away_user_id: away_user_guid,
        }).orWhereRaw('(CONVERT(char(10), match_date ,126)) = ?', [match_date])
        .andWhere({
            home_user_id: away_user_guid,
            away_user_id: home_user_guid,
        })

        return {
            status: 200,
            body: records
        } 
    }

    static async _multiUserNoDateGet(users: String[]){

        let records
        let [home_user, away_user] = users

        let home_user_guid = await this._getUserGuid(home_user)
        let away_user_guid = await this._getUserGuid(away_user)

        records = await conn.select().table('matches')
        .where({
            home_user_id: home_user_guid,
            away_user_id: away_user_guid,
        }).orWhere({
            home_user_id: away_user_guid,
            away_user_id: home_user_guid,
        })

        return {
            status: 200,
            body: records
        } 
    }

    static async _dateOnlyGet(match_date: any){
        let records = await conn.select().table('matches')
            .whereRaw('(CONVERT(char(10), match_date ,126)) = ?', [match_date])

        return {
            status: 200,
            body: records
        }
    }

}

