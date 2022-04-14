var mssql = require('mssql');

class dbConnect {

    constructor(config){
        this.config = config;
        this.pool = new mssql.ConnectionPool(this.config);
    }

    sendRequest(query) {
        const req = new mssql.Request(this.pool)
        this.pool.connect((err => {
            if(err){
                console.error(err)
                return
            }
            req.query(query, (err, data) => {
                if(err){
                    console.error(err)
                    return
                } else {
                    if(data.rowsAffected.length > 0){
                        const dataSQL = data.recordset
                        console.log(dataSQL)
                    } else {
                        console.log('No Data')
                    }
                }
                this.pool.close()
            })
        }))
    }
}

module.exports = dbConnect;

