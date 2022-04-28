export class IMatch {
    guid?: String
    home_user?: String
    away_user?: String
    match_date?: String
    winner?: String
};

export class IUser {
    guid?: String
    player_name?: String
    username: String
    active?: Boolean
};

export class IRound {
    home_score: number
    away_score: number
    round_number: number
    match_id: String
};

export class IResponse {
    statusCode: number
    body: object
}