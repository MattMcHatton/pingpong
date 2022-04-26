import { IResponse } from "./Interfaces"

export class Response {
    statusCode: number
    body: object

    constructor({statusCode, body}: IResponse){
        this.statusCode = statusCode,
        this.body = body
    }
}