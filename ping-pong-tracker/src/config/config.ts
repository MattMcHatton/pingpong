export var config = {
    host: "localhost",
    database: "master",
    user: "sa",
    password: "MyPass@word",
    port: 1433,
    options: {
        trustServerCertificate: true
    }
}

// export var config = {
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT
// }