import { IMatch } from "./Interfaces"
import { User } from "./User"

export class Match {

    guid?: string
    home_user: User
    away_user: User
    match_date: Date
    winner?: User

    constructor({guid, home_user, away_user, match_date}: IMatch){
        this.guid = guid,
        this.home_user = home_user,
        this.away_user = away_user,
        this.match_date = match_date
    }

    getMatch(){
        return
    }

    recordMatch(){
        
    }

}

