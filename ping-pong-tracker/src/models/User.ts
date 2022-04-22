import { IUser } from "./Interfaces"

export class User {

    guid?: string
    player_name: string
    username: string
    active: Boolean

    constructor({player_name, username}: IUser){
        this.player_name = player_name
        this.username = username
    }

    getUser(){
        return
    }

    addUser(){
        return
    }

    deleteUser(){
        return
    }


}