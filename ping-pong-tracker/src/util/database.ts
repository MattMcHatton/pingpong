import knex, { Knex } from 'knex'
import { config } from '../config/config.js'

const conn: Knex = knex({
    client: 'mssql',
    connection: config
})

export default conn