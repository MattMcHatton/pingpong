import { User } from './User'
import { Match } from './Match'

export class IMatch {
    guid?: string
    home_user: User
    away_user: User
    match_date: Date
    winner?: User
};

export class IUser {
    guid?: string
    player_name: string
    username: string
    active?: Boolean
};

export class IRound {
    home_score: number
    away_score: number
    round_number: number
    match_id: Match
};