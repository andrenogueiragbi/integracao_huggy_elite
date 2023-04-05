require('dotenv').config()

//FROM MYSQL
module.exports = {
    dialect: 'mysql',
    database: process.env.DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    logging: false,
    warnings: false,

}

