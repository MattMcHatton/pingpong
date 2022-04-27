import { IRound } from "./Interfaces"

export class Round {

    home_score: number
    away_score: number
    round_number: number
    match_id: String

    constructor({home_score, away_score, round_number, match_id}: IRound){
        this.home_score = home_score
        this.away_score = away_score
        this.match_id = match_id
        this.round_number = round_number
    }

    recordRound() {
        return
    }

    getRound(){
        return
    }


}