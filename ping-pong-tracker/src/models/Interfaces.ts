export class IMatch {
    guid: string
    home_user: IUser
    away_user: IUser
    match_date: Date
    winner: IUser
};

export class IUser {
    guid: string
    player_name: string
    username: string
    active: boolean
};

export class IRound {
    home_score: number
    away_score: number
    round_number: number
    match_id: IMatch
};