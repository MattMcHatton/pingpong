import mssql from 'mssql'
import knex from 'knex'

export class dbConnect {
    
    config: any
    pool: any
    conn: any

    constructor(config){
        this.config = config;
        this.pool = new mssql.ConnectionPool(this.config);
        this.conn = knex({
            client: 'mssql',
            connection: this.config
        })
    }
    
}


